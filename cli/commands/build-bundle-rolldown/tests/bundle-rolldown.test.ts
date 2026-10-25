/* eslint-disable */
import { describe, expect, it } from "vitest";
import { bundleRolldown, bundleRolldownCommand } from "../src/bundle-rolldown.js";

describe("bundle-rolldown", () => {
  it("should export bundleRolldown function", () => {
    expect(typeof bundleRolldown).toBe("function");
  });

  it("should export bundleRolldownCommand", () => {
    expect(bundleRolldownCommand).toBeDefined();
    expect(typeof bundleRolldownCommand.name).toBe("function");
  });
});
