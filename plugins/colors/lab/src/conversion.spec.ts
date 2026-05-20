import type { ILab, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { labToRgb } from "./utils.js";

describe("lab conversion", () => {
  const testCases: {
    expected: IRgb;
    input: ILab;
    name: string;
  }[] = [
    { name: "red", input: { l: 53.2408, aAxis: 80.0925, bAxis: 67.2032 }, expected: { r: 255, g: 0, b: 0 } },
    { name: "green", input: { l: 87.7347, aAxis: -86.1827, bAxis: 83.1793 }, expected: { r: 0, g: 255, b: 0 } },
    { name: "blue", input: { l: 32.297, aAxis: 79.1875, bAxis: -107.8602 }, expected: { r: 0, g: 0, b: 255 } },
    { name: "yellow", input: { l: 97.1393, aAxis: -21.5537, bAxis: 94.478 }, expected: { r: 255, g: 255, b: 0 } },
    { name: "cyan", input: { l: 91.1132, aAxis: -48.0875, bAxis: -14.1312 }, expected: { r: 0, g: 255, b: 255 } },
    { name: "magenta", input: { l: 60.3242, aAxis: 98.2343, bAxis: -60.8249 }, expected: { r: 255, g: 0, b: 255 } },
    { name: "white", input: { l: 100, aAxis: 0, bAxis: 0 }, expected: { r: 255, g: 255, b: 255 } },
    { name: "black", input: { l: 0, aAxis: 0, bAxis: 0 }, expected: { r: 0, g: 0, b: 0 } },
  ];

  for (const { name, input, expected } of testCases) {
    it(`should convert LAB(${input.l},${input.aAxis},${input.bAxis}) to ${name}`, () => {
      const result = labToRgb(input);
      expect(result).toEqual(expected);
    });
  }
});
