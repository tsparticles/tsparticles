import { defineConfig } from "vite";
import inferno from "vite-plugin-inferno";

export default defineConfig({
  plugins: [inferno()],
  base: "./",
  esbuild: {
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
  },
});
