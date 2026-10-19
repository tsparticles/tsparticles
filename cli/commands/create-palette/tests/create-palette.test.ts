/* eslint-disable */
import { describe, expect, it } from "vitest";
import { paletteCreateCommand } from "../src/palette.js";

describe("create-palette command", () => {
  it("should register the palette command", () => {
    expect(paletteCreateCommand).toBeDefined();
    expect(paletteCreateCommand.name()).toBe("palette");
  });

  it("should have a description", () => {
    expect(paletteCreateCommand).toBeDefined();
    expect(paletteCreateCommand.description().length).toBeGreaterThan(0);
  });
});
