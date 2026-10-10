/// <reference types="vitest" />
import { describe, expect, it } from "vitest";
import { createCanonicalAliasTargets, isTsParticlesWorkspacePackage } from "../src/canonical-targets.js";

describe("createCanonicalAliasTargets", () => {
  it("creates aliases for canonical tsParticles Nx targets", () => {
    const targets = createCanonicalAliasTargets({
      "build:bundle:webpack": "webpack --config webpack.config.js",
      "build:bundle:rollup": "rollup -c rollup.config.mjs",
      "build:bundle:rolldown": "rolldown -c rolldown.config.mjs",
      compile: "pnpm run build:ts",
      "prettify:ci:src": "prettier --check ./src/*",
      "prettify:src": "prettier --write ./src/*",
      "clear:dist": "rimraf ./dist",
    });

    expect(Object.keys(targets).sort()).toEqual([
      "bundle:rolldown",
      "bundle:rollup",
      "bundle:webpack",
      "clean",
      "prettify",
      "prettify:ci",
      "tsc",
    ]);
    expect(targets["tsc"]?.options).toEqual({ script: "compile" });
    expect(targets["clean"]?.options).toEqual({ script: "clear:dist" });
  });

  it("does not override targets already present as scripts", () => {
    const targets = createCanonicalAliasTargets({
      prettify: "custom formatter",
      "prettify:src": "prettier --write ./src/*",
      compile: "pnpm run build:ts",
      tsc: "tsc -p src",
    });

    expect(targets["prettify"]).toBeUndefined();
    expect(targets["tsc"]).toBeUndefined();
  });
});

describe("isTsParticlesWorkspacePackage", () => {
  it("matches workspace package roots used by the merged CLI monorepo", () => {
    expect(isTsParticlesWorkspacePackage("cli/commands/build/package.json")).toBe(true);
    expect(isTsParticlesWorkspacePackage("cli/packages/nx-plugin/package.json")).toBe(true);
    expect(isTsParticlesWorkspacePackage("cli/commands/create-utils/files/empty-project/package.json")).toBe(false);
    expect(isTsParticlesWorkspacePackage("commands/build/package.json")).toBe(true);
    expect(isTsParticlesWorkspacePackage("package.json")).toBe(false);
  });
});





