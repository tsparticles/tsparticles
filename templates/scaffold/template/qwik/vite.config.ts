import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [qwikVite({ csr: true })],
  base: "./",
});
