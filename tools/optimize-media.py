from __future__ import annotations

import os
import re
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
BACKUP = Path(r"D:\yu_portfolio_originals")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
VIDEO_EXTENSIONS = {".mp4", ".mov"}
TEXT_EXTENSIONS = {".html", ".css", ".js", ".mjs"}
MAX_IMAGE_EDGE = 2560
MAX_VIDEO_WIDTH = 1920


def backup_media() -> None:
    BACKUP.mkdir(parents=True, exist_ok=True)
    for folder_name in ("images", "videos"):
        source = ROOT / folder_name
        destination = BACKUP / folder_name
        if not destination.exists():
            shutil.copytree(source, destination)
        else:
            for path in source.rglob("*"):
                if not path.is_file():
                    continue
                target = destination / path.relative_to(source)
                if not target.exists():
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(path, target)


def convert_images() -> dict[str, str]:
    replacements: dict[str, str] = {}
    candidates = [
        path
        for base in (ROOT / "images", ROOT / "videos")
        for path in base.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    ]

    for index, source in enumerate(candidates, 1):
        target = source.with_suffix(".webp")
        temporary = target.with_name(target.name + ".tmp")
        try:
            with Image.open(source) as image:
                image = ImageOps.exif_transpose(image)
                if max(image.size) > MAX_IMAGE_EDGE:
                    image.thumbnail((MAX_IMAGE_EDGE, MAX_IMAGE_EDGE), Image.Resampling.LANCZOS)
                has_alpha = image.mode in {"RGBA", "LA"} or "transparency" in image.info
                if has_alpha:
                    image = image.convert("RGBA")
                else:
                    image = image.convert("RGB")
                image.save(temporary, "WEBP", quality=82, method=3, exact=has_alpha)

            if temporary.stat().st_size < source.stat().st_size:
                if target.exists() and target != source:
                    target.unlink()
                temporary.replace(target)
                old_path = source.relative_to(ROOT).as_posix()
                new_path = target.relative_to(ROOT).as_posix()
                replacements[old_path] = new_path
                source.unlink()
            else:
                temporary.unlink(missing_ok=True)
        except Exception as error:
            temporary.unlink(missing_ok=True)
            print(f"IMAGE ERROR: {source.relative_to(ROOT)}: {error}")

        if index % 50 == 0 or index == len(candidates):
            print(f"Images {index}/{len(candidates)}")

    # Include files converted by an earlier interrupted run so their references
    # are updated as well.
    for folder_name in ("images", "videos"):
        backup_root = BACKUP / folder_name
        if not backup_root.exists():
            continue
        for original in backup_root.rglob("*"):
            if not original.is_file() or original.suffix.lower() not in IMAGE_EXTENSIONS:
                continue
            relative = original.relative_to(BACKUP)
            webp_relative = relative.with_suffix(".webp")
            if (ROOT / webp_relative).exists() and not (ROOT / relative).exists():
                replacements[relative.as_posix()] = webp_relative.as_posix()

    return replacements


def update_references(replacements: dict[str, str]) -> None:
    if not replacements:
        return

    variants: list[tuple[str, str]] = []
    for old, new in replacements.items():
        variants.extend(
            (
                (old, new),
                ("./" + old, "./" + new),
                ("../" + old, "../" + new),
                ("../../" + old, "../../" + new),
                (old.replace("/", "\\"), new.replace("/", "\\")),
            )
        )
    variants.sort(key=lambda pair: len(pair[0]), reverse=True)

    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTENSIONS:
            continue
        if ".git" in path.parts:
            continue
        content = path.read_text(encoding="utf-8")
        updated = content
        for old, new in variants:
            updated = updated.replace(old, new)
        if updated != content:
            path.write_text(updated, encoding="utf-8", newline="\n")


def optimize_videos() -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        print("VIDEO ERROR: ffmpeg not found")
        return

    candidates = [
        path
        for base in (ROOT / "images", ROOT / "videos")
        for path in base.rglob("*")
        if path.is_file() and path.suffix.lower() in VIDEO_EXTENSIONS
    ]

    for index, source in enumerate(candidates, 1):
        temporary = source.with_name(source.stem + ".webtmp.mp4")
        command = [
            ffmpeg,
            "-y",
            "-i",
            str(source),
            "-vf",
            f"scale='min({MAX_VIDEO_WIDTH},iw)':-2",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "27",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            str(temporary),
        ]
        try:
            subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            if temporary.stat().st_size < source.stat().st_size:
                temporary.replace(source)
            else:
                temporary.unlink(missing_ok=True)
        except Exception as error:
            temporary.unlink(missing_ok=True)
            print(f"VIDEO ERROR: {source.relative_to(ROOT)}: {error}")
        print(f"Videos {index}/{len(candidates)}")


def media_size(base: Path) -> int:
    return sum(path.stat().st_size for path in base.rglob("*") if path.is_file())


if __name__ == "__main__":
    before = media_size(ROOT / "images") + media_size(ROOT / "videos")
    backup_media()
    replacements = convert_images()
    update_references(replacements)
    optimize_videos()
    after = media_size(ROOT / "images") + media_size(ROOT / "videos")
    print(f"Converted images: {len(replacements)}")
    print(f"Before: {before / 1024 / 1024:.1f} MB")
    print(f"After: {after / 1024 / 1024:.1f} MB")
    print(f"Saved: {(before - after) / 1024 / 1024:.1f} MB")
    print(f"Originals: {BACKUP}")
