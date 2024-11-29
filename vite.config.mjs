/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: true,
    outDir: "dist",
    rollupOptions: {
      input: "src/index.ts",
      output: {
        entryFileNames: "kanji-clock-card.js",
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
