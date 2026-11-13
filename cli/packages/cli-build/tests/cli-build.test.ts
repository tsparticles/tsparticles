/* eslint-disable */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const binPath = path.join(__dirname, "..", "bin", "tsparticles-build.cjs");

function runBin(args: string[], cwd?: string): string {
  return execFileSync(process.execPath, [binPath, ...args], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    cwd,
  }).trim();
}

describe("tsparticles-build CLI", () => {
  it("should expose the bin file", () => {
    expect(existsSync(binPath)).toBe(true);
  });

  it("should print the package version", () => {
    expect(runBin(["--version"])).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("should print help with the build command", () => {
    const output = runBin(["--help"]);

    expect(output).toContain("build");
  });

  it("preserves the source manifest when distfiles runs with --ci", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "tsparticles-cli-build-")),
      template = '{"name":"fixture","version":"0.0.0"}\n';

    try {
      writeFileSync(path.join(directory, "package.json"), '{"name":"fixture","version":"4.6.0"}');
      writeFileSync(path.join(directory, "package.dist.json"), template);
      writeFileSync(path.join(directory, "LICENSE"), "");
      writeFileSync(path.join(directory, "README.md"), "");

      for (const format of ["browser", "cjs", "esm"]) {
        mkdirSync(path.join(directory, "dist", format), { recursive: true });
      }

      runBin(["distfiles", "--ci"], directory);

      expect(readFileSync(path.join(directory, "package.dist.json"), "utf8")).toBe(template);
      expect(JSON.parse(readFileSync(path.join(directory, "dist", "package.json"), "utf8")).version).toBe("4.6.0");
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  });
});
