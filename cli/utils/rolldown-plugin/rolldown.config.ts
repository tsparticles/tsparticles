import { builtinModules } from "node:module";
import typescript from "@rollup/plugin-typescript";

const external = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  "@rollup/plugin-node-resolve",
  "@rollup/plugin-replace",
  "@rollup/plugin-terser",
  "@tsparticles/rolldown-plugin",
  "rolldown",
  "rollup",
  "rollup-plugin-visualizer",
];

export default {
  input: "src/index.ts",
  external,
  plugins: [typescript()],
  output: [
    { file: "dist/index.js", format: "es" },
    { file: "dist/index.cjs", format: "cjs" },
  ],
};
