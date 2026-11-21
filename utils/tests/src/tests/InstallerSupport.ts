/* eslint-disable */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const installer = path.resolve(process.cwd(), "../../engine/scripts/install.js");

function installOutput(dependencies: Record<string, string>): string {
  const directory = mkdtempSync(path.join(tmpdir(), "tsparticles-installer-"));

  try {
    writeFileSync(path.join(directory, "package.json"), JSON.stringify({ dependencies }));

    const result = spawnSync(process.execPath, [installer], {
      encoding: "utf8",
      env: { ...process.env, INIT_CWD: directory },
      stdio: ["ignore", "pipe", "pipe"],
    });

    expect(result.status).toBe(0);

    return result.stdout + result.stderr;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

describe("v5 installer framework support", () => {
  it.each(["4.0.0", "^4.0.0", "~4.0.0"])("recommends Nuxt 4 for %s", version => {
    expect(installOutput({ nuxt: version })).toContain("@tsparticles/nuxt4");
  });

  it.each(["3.5.0", "^3.5.0", "~3.5.0"])("recommends Vue 3 for %s", version => {
    expect(installOutput({ vue: version })).toContain("@tsparticles/vue3");
  });

  it.each([{ vue: "^2.7.16" }, { nuxt: "^2.18.1" }, { nuxt: "^3.0.0" }])(
    "does not recommend a retired integration for %j",
    dependencies => {
      const output = installOutput(dependencies);

      expect(output).not.toMatch(/@tsparticles\/(vue2|nuxt2|nuxt3)/);
      expect(output).not.toContain("Please install");
      expect(output).not.toMatch(/TypeError|detector is not a function/);
    },
  );

  it("does not recommend another framework wrapper for Nuxt 4", () => {
    const output = installOutput({ nuxt: "^4.0.0", vue: "^3.5.0" });

    expect(output).toContain("@tsparticles/nuxt4");
    expect(output).not.toContain("@tsparticles/vue3");
  });

  it("does not recommend a wrapper that is already installed", () => {
    expect(installOutput({ nuxt: "^4.0.0", "@tsparticles/nuxt4": "^5.0.0" })).not.toContain("Please install");
  });

  it("continues detection after Vue when a later framework is installed", () => {
    expect(installOutput({ svelte: "^5.0.0" })).toContain("@tsparticles/svelte");
  });
});
