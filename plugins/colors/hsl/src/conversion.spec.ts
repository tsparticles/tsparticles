import type { IHsl, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { HslColorManager } from "./HslColorManager.js";

describe("HslColorManager", () => {
  const manager = new HslColorManager(),
    testCases: {
      expected: IRgb;
      input: IHsl;
      name: string;
    }[] = [
      { name: "red", input: { h: 0, s: 100, l: 50 }, expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: { h: 120, s: 100, l: 50 }, expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: { h: 240, s: 100, l: 50 }, expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: { h: 60, s: 100, l: 50 }, expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: { h: 180, s: 100, l: 50 }, expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: { h: 300, s: 100, l: 50 }, expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: { h: 0, s: 0, l: 100 }, expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: { h: 0, s: 0, l: 0 }, expected: { r: 0, g: 0, b: 0 } },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert HSL(${input.h},${input.s}%,${input.l}%) to ${name}`, () => {
      const result = manager.handleColor({ value: input });
      expect(result).toMatchObject(expected);
    });
  }
});
