import * as path from "path";

import { InputOptions, OutputOptions, rollup, RollupOutput } from "rollup";

const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");

const ENTRY_FILE = `src/web-particles.ts`;

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: ENTRY_FILE,
    external: [
      "tsparticles",
    ],
    plugins: [
      typescript({
        declaration: true,
        declarationDir: "dist",
        declarationMap: false,
        rootDir: "src",
      }),
      resolve({ preferBuiltins: false }),
    ],
    onwarn(warning: { code: string; message: string }) {
      if (warning.code === "THIS_IS_UNDEFINED") {
        return;
      }
      console.log("Rollup warning: ", warning.message);
    },
  } as InputOptions,
  outputOptions: {
    sourcemap: true,
    exports: "named",
    // When Rollup emits multiple chunks the `file` option is invalid.
    // Use `dir` so Rollup can write chunked output into the dist folder
    // and set `entryFileNames` to keep the main filename predictable.
    dir: "dist",
    entryFileNames: "web-particles.js",
    name: "web-particles",
    format: "es",
  } as OutputOptions,
};

function rollupBuild({
  inputOptions,
  outputOptions,
}: {
  inputOptions: InputOptions;
  outputOptions: OutputOptions;
}): Promise<RollupOutput> {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

rollupBuild(rollupConfig).catch(err => {
  console.error(err);
});
