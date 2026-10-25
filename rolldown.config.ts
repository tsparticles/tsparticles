import typescript from "@rollup/plugin-typescript";
import { builtinModules } from "node:module";
import type { RolldownConfig } from "./src/types.js";

const external: string[] = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  "@rollup/plugin-node-resolve",
  "@rollup/plugin-replace",
  "@rollup/plugin-terser",
  "@tsparticles/rollup-plugin",
  "rolldown",
  "rollup",
  "rolldown-plugin-visualizer",
];

export default {
  input: {
    input: "src/index.ts",
    external,
    plugins: [typescript()],
  },
  outputs: [
    { file: "dist/index.js", format: "es" },
    { file: "dist/index.cjs", format: "cjs" },
  ],
} satisfies RolldownConfig;
