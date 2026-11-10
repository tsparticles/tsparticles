/* eslint-disable */
import { describe, expect, it } from "vitest";
import { buildDistFiles, distFilesCommand } from "../src/distfiles.js";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

describe("build-distfiles", () => {
  it("should export buildDistFiles function", () => {
    expect(typeof buildDistFiles).toBe("function");
  });

  it("should export distFilesCommand", () => {
    expect(distFilesCommand).toBeDefined();
    expect(typeof distFilesCommand.name).toBe("function");
  });

  it("keeps CI package templates, docs, and binary assets unchanged", async () => {
    const basePath = await mkdtemp(path.join(os.tmpdir(), "tsparticles-distfiles-")),
      distPath = path.join(basePath, "dist"),
      sourceManifest = JSON.stringify(
        {
          name: "fixture",
          version: "0.0.0",
          dependencies: { "@tsparticles/engine": "workspace:*" },
        },
        undefined,
        2,
      );
    const binary = Buffer.from([0, 95, 95, 86, 69, 82, 83, 73, 79, 78, 95, 95, 255]);

    try {
      await mkdir(path.join(distPath, "cjs"), { recursive: true });
      await mkdir(path.join(distPath, "esm"), { recursive: true });
      await mkdir(path.join(distPath, "browser"), { recursive: true });
      await writeFile(path.join(basePath, "package.json"), JSON.stringify({ version: "4.5.4" }));
      await writeFile(path.join(basePath, "package.dist.json"), sourceManifest);
      await writeFile(path.join(basePath, "LICENSE"), "fixture license");
      await writeFile(path.join(basePath, "README.md"), "Keep __VERSION__ as documentation text.");
      await writeFile(path.join(distPath, "cjs", "index.js"), "const version = __VERSION__;");
      await writeFile(path.join(distPath, "esm", "index.js"), "export const version = __VERSION__;");
      await writeFile(path.join(distPath, "browser", "asset.bin"), binary);

      expect(await buildDistFiles(basePath, true, true)).toBe(true);

      expect(await readFile(path.join(basePath, "package.dist.json"), "utf8")).toBe(sourceManifest);
      expect(await readFile(path.join(distPath, "README.md"), "utf8")).toContain("Keep __VERSION__");
      expect(await readFile(path.join(distPath, "cjs", "index.js"), "utf8")).toContain('"4.5.4"');
      expect(await readFile(path.join(distPath, "esm", "index.js"), "utf8")).toContain('"4.5.4"');
      expect(await readFile(path.join(distPath, "browser", "asset.bin"))).toEqual(binary);
      expect(JSON.parse(await readFile(path.join(distPath, "package.json"), "utf8")).version).toBe("4.5.4");
    } finally {
      await rm(basePath, { recursive: true, force: true });
    }
  });
});
