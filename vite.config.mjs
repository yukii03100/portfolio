import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = resolve(".");

function htmlInputs() {
  const entries = {
    index: resolve(root, "index.html"),
    about: resolve(root, "about.html"),
    illustration: resolve(root, "illustration.html"),
    works: resolve(root, "works.html"),
    "en/index": resolve(root, "en", "index.html"),
    "en/about": resolve(root, "en", "about.html"),
    "en/illustration": resolve(root, "en", "illustration.html"),
    "en/works": resolve(root, "en", "works.html"),
    "en/work": resolve(root, "en", "work.html"),
  };

  for (const file of readdirSync(resolve(root, "works"))) {
    if (file.endsWith(".html")) {
      entries[`works/${file.replace(/\.html$/, "")}`] = resolve(root, "works", file);
    }
  }

  return entries;
}

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      input: htmlInputs(),
    },
  },
});
