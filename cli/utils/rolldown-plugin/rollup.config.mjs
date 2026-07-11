import typescript from "@rollup/plugin-typescript";
import { builtinModules } from "node:module";

export default {
  input: "src/index.ts",
  external: [
    ...builtinModules,
    ...builtinModules.map(m => `node:${m}`),
    "rolldown",
    "node:path",
  ],
  output: [
    { file: "dist/index.js", format: "esm" },
    { file: "dist/index.cjs", format: "cjs" }
  ],
  plugins: [typescript()]
};
