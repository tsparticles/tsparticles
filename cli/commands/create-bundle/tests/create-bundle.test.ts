/* eslint-disable */
import { describe, expect, it } from "vitest";
import { bundleCreateCommand } from "../src/bundle.js";

describe("create-bundle command", () => {
  it("should register the bundle command", () => {
    expect(bundleCreateCommand).toBeDefined();
    expect(bundleCreateCommand.name()).toBe("bundle");
  });

  it("should have a description", () => {
    expect(bundleCreateCommand).toBeDefined();
    expect(bundleCreateCommand.description().length).toBeGreaterThan(0);
  });
});
