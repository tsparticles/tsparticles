import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  plugins: [qwikVite(), tsconfigPaths()],
}));
