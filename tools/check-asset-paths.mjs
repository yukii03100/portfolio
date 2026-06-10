import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "dist"]);
const files = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (ignoredDirs.has(name)) continue;

    const fullPath = join(dir, name);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      files.push(relative(root, fullPath).replaceAll("\\", "/"));
    }
  }
}

walk(root);

const exactPaths = new Set(files);
const lowerToExact = new Map(files.map((file) => [file.toLowerCase(), file]));
const sourceFiles = files.filter((file) => /\.(html|css|js)$/i.test(file));
const referencePattern = /(?:src|href)="([^"]+)"|(?:src|href)='([^']+)'|url\(([^)]+)\)/g;
const refs = [];

for (const file of sourceFiles) {
  const content = readFileSync(file, "utf8");
  let match;

  while ((match = referencePattern.exec(content))) {
    let url = (match[1] || match[2] || match[3] || "").trim().replace(/^['"]|['"]$/g, "");

    if (
      !url ||
      url.includes("${") ||
      url.startsWith("http") ||
      url.startsWith("#") ||
      url.startsWith("mailto:") ||
      url.startsWith("data:") ||
      url.startsWith("javascript:")
    ) {
      continue;
    }

    url = url.split("?")[0].split("#")[0];

    const target = (url.startsWith("/") ? url.slice(1) : normalize(join(dirname(file), url)))
      .replaceAll("\\", "/");

    refs.push({ from: file, url, target });
  }
}

const missing = [];
const caseOnly = [];

for (const ref of refs) {
  if (exactPaths.has(ref.target)) continue;

  const actual = lowerToExact.get(ref.target.toLowerCase());
  if (actual) {
    caseOnly.push({ ...ref, actual });
  } else {
    missing.push(ref);
  }
}

console.log(JSON.stringify({ caseOnly, missing }, null, 2));
