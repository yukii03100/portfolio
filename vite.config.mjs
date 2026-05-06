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
