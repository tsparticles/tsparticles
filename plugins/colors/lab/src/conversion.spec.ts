import type { ILab, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";

import { LabColorManager } from "./LabColorManager.js";
import { labToRgb } from "./utils.js";

describe("lab conversion", () => {
  const testCases: {
    expected: IRgb;
    input: ILab;
    name: string;
  }[] = [
    { name: "red", input: { l: 54.2943, aAxis: 80.8192, bAxis: 69.8969 }, expected: { r: 255, g: 0, b: 0 } },
    { name: "green", input: { l: 87.8177, aAxis: -79.2608, bAxis: 80.9982 }, expected: { r: 0, g: 255, b: 0 } },
    { name: "blue", input: { l: 29.5647, aAxis: 68.2889, bAxis: -112.0126 }, expected: { r: 0, g: 0, b: 255 } },
    { name: "yellow", input: { l: 97.6078, aAxis: -15.7291, bAxis: 93.3993 }, expected: { r: 255, g: 255, b: 0 } },
    { name: "cyan", input: { l: 90.6646, aAxis: -50.6508, bAxis: -14.9415 }, expected: { r: 0, g: 255, b: 255 } },
    { name: "magenta", input: { l: 60.1708, aAxis: 93.5511, bAxis: -60.4745 }, expected: { r: 255, g: 0, b: 255 } },
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

describe("CSS Lab to OKLCH conversion", () => {
  it("converts the D50 CSS Lab red reference directly to D65 OKLCH", () => {
    const result = new LabColorManager().parseStringOklch("lab(54.2943% 80.8192 69.8969 / 25%)");

    expect(result?.l).toBeCloseTo(62.8, 1);
    expect(result?.c).toBeCloseTo(0.2577, 3);
    expect(result?.h).toBeCloseTo(29.23, 1);
    expect(result?.a).toBe(0.25);
  });

  it("accepts signed Lab axes and rejects incomplete or invalid CSS input", () => {
    const manager = new LabColorManager(),
      resolved = manager.parseStringOklch("LAB(50% -12.5 +8 / 25%)");

    expect(resolved?.a).toBe(0.25);
    expect([resolved?.l, resolved?.c, resolved?.h].every(Number.isFinite)).toBe(true);
    expect(manager.parseStringOklch("lab(50% -12.5 +8) trailing")).toBeUndefined();
    expect(manager.parseStringOklch("lab(50% -12.5 +8 / 101%)")).toBeUndefined();
    expect(manager.parseString("lab(101% -12.5 +8)")).toBeUndefined();
  });

  it("accepts unitless lightness and percentage a/b axes using CSS reference scales", () => {
    const manager = new LabColorManager(),
      numeric = "lab(52.2345 40.1645 59.9971 / 25%)",
      percentAxes = "lab(52.2345% 32.1316% 47.99768% / 25%)",
      percentage = "lab(52.2345% 40.1645 59.9971 / 25%)";

    expect(manager.parseString(numeric)).toEqual(manager.parseString(percentage));
    expect(manager.parseString(percentAxes)).toEqual(manager.parseString(percentage));
    expect(manager.parseStringOklch(numeric)).toEqual(manager.parseStringOklch(percentage));
    expect(manager.parseStringOklch(percentAxes)).toEqual(manager.parseStringOklch(percentage));
  });

  it("rejects calc() and exponent notation", () => {
    const manager = new LabColorManager();

    expect(manager.parseString("lab(calc(50) 0 0)")).toBeUndefined();
    expect(manager.parseString("lab(5e1 0 0)")).toBeUndefined();
  });
});
