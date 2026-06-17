import { qwikVite } from "@builder.io/qwik/plugin.vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [qwikVite()],
  base: "./",
});
