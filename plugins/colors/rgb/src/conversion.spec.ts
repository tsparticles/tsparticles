import { describe, expect, it } from "vitest";
import type { IRgb } from "@tsparticles/engine";
import { RgbColorManager } from "./RgbColorManager.js";

describe("RgbColorManager", () => {
  const manager = new RgbColorManager(),
    testCases: {
      expected: IRgb;
      input: IRgb;
      name: string;
    }[] = [
      { name: "red", input: { r: 255, g: 0, b: 0 }, expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: { r: 0, g: 255, b: 0 }, expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: { r: 0, g: 0, b: 255 }, expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: { r: 255, g: 255, b: 0 }, expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: { r: 0, g: 255, b: 255 }, expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: { r: 255, g: 0, b: 255 }, expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: { r: 255, g: 255, b: 255 }, expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: { r: 0, g: 0, b: 0 }, expected: { r: 0, g: 0, b: 0 } },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert RGB(${input.r},${input.g},${input.b}) to ${name}`, () => {
      const result = manager.handleColor({ value: input });
      expect(result).toMatchObject(expected);
    });
  }
});
