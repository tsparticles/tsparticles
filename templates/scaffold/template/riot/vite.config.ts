import riot from "rollup-plugin-riot";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [riot()],
  base: "./",
});
