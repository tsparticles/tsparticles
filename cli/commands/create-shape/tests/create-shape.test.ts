/* eslint-disable */
import { describe, expect, it } from "vitest";
import { shapeCreateCommand } from "../src/shape.js";

describe("create-shape command", () => {
  it("should register the shape command", () => {
    expect(shapeCreateCommand).toBeDefined();
    expect(shapeCreateCommand.name()).toBe("shape");
  });

  it("should have a description", () => {
    expect(shapeCreateCommand).toBeDefined();
    expect(shapeCreateCommand.description().length).toBeGreaterThan(0);
  });
});
