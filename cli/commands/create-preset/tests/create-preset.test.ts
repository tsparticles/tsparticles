/* eslint-disable */
import { describe, expect, it } from "vitest";
import { presetCreateCommand } from "../src/preset.js";

describe("create-preset command", () => {
  it("should register the preset command", () => {
    expect(presetCreateCommand).toBeDefined();
    expect(presetCreateCommand.name()).toBe("preset");
  });

  it("should have a description", () => {
    expect(presetCreateCommand).toBeDefined();
    expect(presetCreateCommand.description().length).toBeGreaterThan(0);
  });
});
