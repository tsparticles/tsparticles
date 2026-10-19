/* eslint-disable */
import { describe, expect, it } from "vitest";
import { bundleRollup, bundleRollupCommand } from "../src/bundle-rollup.js";

describe("build-bundle-rollup", () => {
  it("should export bundleRollup function", () => {
    expect(typeof bundleRollup).toBe("function");
  });

  it("should export bundleRollupCommand", () => {
    expect(bundleRollupCommand).toBeDefined();
    expect(typeof bundleRollupCommand.name).toBe("function");
  });
});
