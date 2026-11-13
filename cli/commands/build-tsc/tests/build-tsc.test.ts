/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildTS, tscCommand } from "../src/tsc.js";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

describe("build-tsc", () => {
  it("should export buildTS function", () => {
    expect(typeof buildTS).toBe("function");
  });

  it("should export tscCommand", () => {
    expect(tscCommand).toBeDefined();
    expect(typeof tscCommand.name).toBe("function");
  });

  it("accepts JSONC options and resolves relative extends in all four builds", async () => {
    const basePath = await mkdtemp(path.join(os.tmpdir(), "tsparticles-tsc-")),
      sourcePath = path.join(basePath, "src");

    try {
      await mkdir(sourcePath);
      await writeFile(path.join(sourcePath, "index.ts"), "export const answer = 42;\n");
      await writeFile(
        path.join(basePath, "base.json"),
        JSON.stringify({ compilerOptions: { target: "ES2022", strict: true }, include: ["src"] }),
      );

      for (const [file, outDir, module] of [
        ["tsconfig.browser.json", "dist/browser", "ESNext"],
        ["tsconfig.json", "dist/cjs", "CommonJS"],
        ["tsconfig.module.json", "dist/esm", "ESNext"],
        ["tsconfig.types.json", "dist/types", "ESNext"],
      ]) {
        await writeFile(
          path.join(basePath, file),
          `// allow JSONC\n{ "extends": "./base.json", "compilerOptions": { "module": "${module}", "rootDir": "src", "outDir": "${outDir}", "declaration": true, }, }\n`,
        );
      }

      expect(await buildTS(basePath, true)).toBe(true);
      expect(await readFile(path.join(basePath, "dist/cjs/index.js"), "utf8")).toContain("answer");
      expect(await readFile(path.join(basePath, "dist/browser/index.js"), "utf8")).toContain("answer");
      expect(await readFile(path.join(basePath, "dist/esm/index.js"), "utf8")).toContain("answer");
      expect(await readFile(path.join(basePath, "dist/types/index.d.ts"), "utf8")).toContain("answer");
    } finally {
      await rm(basePath, { recursive: true, force: true });
    }
  });

  it("emits loadable CommonJS from a NodeNext package declared as ESM", async () => {
    const basePath = await mkdtemp(path.join(os.tmpdir(), "tsparticles-tsc-")),
      sourcePath = path.join(basePath, "src"),
      peerPath = path.join(basePath, "node_modules", "fixture-peer"),
      manifest = '{"type":"module"}\n';

    try {
      await mkdir(sourcePath);
      await mkdir(peerPath, { recursive: true });
      await writeFile(path.join(basePath, "package.json"), manifest);
      await writeFile(
        path.join(peerPath, "package.json"),
        JSON.stringify({
          type: "module",
          exports: { require: "./index.cjs", import: "./index.js" },
        }),
      );
      await writeFile(path.join(peerPath, "index.cjs"), 'exports.format = "cjs";\n');
      await writeFile(path.join(peerPath, "index.js"), 'export const format = "esm";\n');
      await writeFile(path.join(peerPath, "index.d.cts"), 'export const format: "cjs";\n');
      await writeFile(path.join(peerPath, "index.d.ts"), 'export const format: "esm";\n');
      await writeFile(path.join(sourcePath, "value.ts"), "export const value = 42;\n");
      await writeFile(
        path.join(sourcePath, "index.ts"),
        'export { format } from "fixture-peer";\nexport { value } from "./value.js";\nexport const load = () => import("./value.js");\n',
      );

      for (const [file, outDir] of [
        ["tsconfig.browser.json", "dist/browser"],
        ["tsconfig.json", "dist/cjs"],
        ["tsconfig.module.json", "dist/esm"],
        ["tsconfig.types.json", "dist/types"],
      ]) {
        await writeFile(
          path.join(basePath, file),
          JSON.stringify({
            compilerOptions: {
              module: "NodeNext",
              target: "ES2022",
              rootDir: "src",
              outDir,
              declaration: true,
            },
            include: ["src"],
          }),
        );
      }

      expect(await buildTS(basePath, true)).toBe(true);
      expect(await readFile(path.join(basePath, "package.json"), "utf8")).toBe(manifest);
      await writeFile(path.join(basePath, "dist/cjs/package.json"), '{"type":"commonjs"}');

      execFileSync(
        process.execPath,
        [
          "--input-type=module",
          "-e",
          `
            import assert from "node:assert/strict";
            import { createRequire } from "node:module";
            const require = createRequire(import.meta.url);
            const common = require("./dist/cjs/index.js");
            const module = await import("./dist/esm/index.js");
            assert.equal(common.format, "cjs");
            assert.equal(module.format, "esm");
            for (const entry of [common, module]) {
              assert.equal(entry.value, 42);
              assert.equal((await entry.load()).value, 42);
            }
          `,
        ],
        { cwd: basePath, timeout: 10_000 },
      );
    } finally {
      await rm(basePath, { recursive: true, force: true });
    }
  });
});
