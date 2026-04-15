import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "next/dynamic", "@tsparticles/react"],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map(file => [
          relative("lib", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    lib: {
      entry: resolve(__dirname, "lib/index.tsx"),
      formats: ["es"],
    },
    copyPublicDir: false,
  },
});
