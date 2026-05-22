import type { ILch, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { lchToRgb } from "./utils.js";

describe("LCH conversion", () => {
  const testCases: {
    expected: IRgb;
    input: ILch;
    name: string;
  }[] = [
    { name: "red", input: { l: 53.2408, c: 104.5518, h: 39.999 }, expected: { r: 255, g: 0, b: 0 } },
    { name: "green", input: { l: 87.7347, c: 119.7759, h: 136.016 }, expected: { r: 0, g: 255, b: 0 } },
    { name: "blue", input: { l: 32.297, c: 133.8076, h: 306.2849 }, expected: { r: 0, g: 0, b: 255 } },
    { name: "yellow", input: { l: 97.1393, c: 96.9054, h: 102.8512 }, expected: { r: 255, g: 255, b: 0 } },
    { name: "cyan", input: { l: 91.1132, c: 50.1209, h: 196.3762 }, expected: { r: 0, g: 255, b: 255 } },
    { name: "magenta", input: { l: 60.3242, c: 115.5407, h: 328.235 }, expected: { r: 255, g: 0, b: 255 } },
    { name: "white", input: { l: 100, c: 0, h: 0 }, expected: { r: 255, g: 255, b: 255 } },
    { name: "black", input: { l: 0, c: 0, h: 0 }, expected: { r: 0, g: 0, b: 0 } },
  ];

  for (const { name, input, expected } of testCases) {
    it(`should convert LCH(${input.l},${input.c},${input.h}) to ${name}`, () => {
      const result = lchToRgb(input);
      expect(result).toEqual(expected);
    });
  }
});
