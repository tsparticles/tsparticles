import { describe, expect, it } from "vitest";
import { HexColorManager } from "./HexColorManager.js";
import type { IRgb } from "@tsparticles/engine";

describe("HexColorManager", () => {
  const manager = new HexColorManager(),
    testCases: { expected: IRgb; input: string; name: string }[] = [
      { name: "red", input: "#ff0000", expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: "#00ff00", expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: "#0000ff", expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: "#ffff00", expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: "#00ffff", expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: "#ff00ff", expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: "#ffffff", expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: "#000000", expected: { r: 0, g: 0, b: 0 } },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert "${input}" to ${name}`, () => {
      const result = manager.handleColor({ value: input });
      expect(result).toMatchObject(expected);
    });
  }

  it("should return undefined for invalid input", () => {
    expect(manager.handleColor({ value: "invalid" })).toBeUndefined();
  });
});
