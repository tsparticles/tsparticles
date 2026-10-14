/* eslint-disable */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const binPath = path.join(__dirname, "..", "bin", "tsparticles-create.cjs");

function runBin(args: string[]): string {
  return execFileSync(process.execPath, [binPath, ...args], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

describe("tsparticles-create CLI", () => {
  it("should expose the bin file", () => {
    expect(existsSync(binPath)).toBe(true);
  });

  it("should print the package version", () => {
    expect(runBin(["--version"])).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("should print help with the create command", () => {
    const output = runBin(["--help"]);

    expect(output).toContain("create");
  });
});
