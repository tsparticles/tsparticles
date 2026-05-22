import type { IOklab, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { oklabToRgb } from "./utils.js";

describe("OKLab conversion", () => {
  const testCases: {
    expected: IRgb;
    input: IOklab;
    name: string;
  }[] = [
    { name: "red", input: { l: 62.7955, aAxis: 0.2249, bAxis: 0.1258 }, expected: { r: 255, g: 0, b: 0 } },
    { name: "green", input: { l: 86.644, aAxis: -0.2339, bAxis: 0.1795 }, expected: { r: 0, g: 255, b: 0 } },
    { name: "blue", input: { l: 45.2014, aAxis: -0.0325, bAxis: -0.3115 }, expected: { r: 0, g: 0, b: 255 } },
    { name: "yellow", input: { l: 96.7983, aAxis: -0.0714, bAxis: 0.1986 }, expected: { r: 255, g: 255, b: 0 } },
    { name: "cyan", input: { l: 90.5399, aAxis: -0.14944, bAxis: -0.0394 }, expected: { r: 0, g: 255, b: 255 } },
    { name: "magenta", input: { l: 70.1674, aAxis: 0.2746, bAxis: -0.1692 }, expected: { r: 255, g: 0, b: 255 } },
    { name: "white", input: { l: 100, aAxis: 0, bAxis: 0 }, expected: { r: 255, g: 255, b: 255 } },
    { name: "black", input: { l: 0, aAxis: 0, bAxis: 0 }, expected: { r: 0, g: 0, b: 0 } },
  ];

  for (const { name, input, expected } of testCases) {
    it(`should convert OKLab(${input.l},${input.aAxis},${input.bAxis}) to ${name}`, () => {
      const result = oklabToRgb(input);
      expect(result).toEqual(expected);
    });
  }
});
