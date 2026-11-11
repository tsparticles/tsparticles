/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildTS, tscCommand } from "../src/tsc.js";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
});
