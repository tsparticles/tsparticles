/* eslint-disable */
import { describe, expect, it } from "vitest";
import { loadParticlesBundle } from "@tsparticles/rolldown-plugin";
import { bundleRolldown, bundleRolldownCommand } from "../src/bundle-rolldown.js";

describe("bundle-rolldown", () => {
  it("should export bundleRolldown function", () => {
    expect(typeof bundleRolldown).toBe("function");
  });

  it("should export bundleRolldownCommand", () => {
    expect(bundleRolldownCommand).toBeDefined();
    expect(typeof bundleRolldownCommand.name).toBe("function");
  });

  it("should enable native minification only for minified outputs", () => {
    const configs = loadParticlesBundle({
        bundle: true,
        dir: "/tmp/basic",
        version: "4.6.0",
      }),
      outputs = configs.flatMap(config => config.outputs),
      minified = outputs.filter(output => output.file?.endsWith(".min.js")),
      unminified = outputs.filter(output => output.file?.endsWith(".js") && !output.file.endsWith(".min.js"));

    expect(minified.length).toBeGreaterThan(0);
    expect(minified.every(output => output.minify === true)).toBe(true);
    expect(unminified.length).toBeGreaterThan(0);
    expect(unminified.every(output => output.minify !== true)).toBe(true);
  });
});
