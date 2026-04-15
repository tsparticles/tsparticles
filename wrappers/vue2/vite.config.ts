import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/Particles/index.ts"),
      name: "@tsparticles/vue2",
      fileName: format => `vue2-particles.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@tsparticles/engine"],
      output: {
        globals: {
          vue: "Vue",
          "@tsparticles/engine": "tsParticles",
        },
      },
    },
  },
  plugins: [vue(), dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
