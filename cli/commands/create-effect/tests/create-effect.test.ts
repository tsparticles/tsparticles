/* eslint-disable */
import { describe, expect, it } from "vitest";
import { effectCreateCommand } from "../src/effect.js";

describe("create-effect command", () => {
  it("should register the effect command", () => {
    expect(effectCreateCommand).toBeDefined();
    expect(effectCreateCommand.name()).toBe("effect");
  });

  it("should have a description", () => {
    expect(effectCreateCommand).toBeDefined();
    expect(effectCreateCommand.description().length).toBeGreaterThan(0);
  });
});
