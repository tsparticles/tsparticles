import type { ILch, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { LchColorManager } from "./LchColorManager.js";
import { lchToRgb } from "./utils.js";

describe("LCH conversion", () => {
  const testCases: {
    expected: IRgb;
    input: ILch;
    name: string;
  }[] = [
    { name: "red", input: { l: 54.2943, c: 106.8519, h: 40.855 }, expected: { r: 255, g: 0, b: 0 } },
    { name: "green", input: { l: 87.8177, c: 113.3269, h: 134.3789 }, expected: { r: 0, g: 255, b: 0 } },
    { name: "blue", input: { l: 29.5647, c: 131.1877, h: 301.3687 }, expected: { r: 0, g: 0, b: 255 } },
    { name: "yellow", input: { l: 97.6078, c: 94.7145, h: 99.5593 }, expected: { r: 255, g: 255, b: 0 } },
    { name: "cyan", input: { l: 90.6646, c: 52.8087, h: 196.4355 }, expected: { r: 0, g: 255, b: 255 } },
    { name: "magenta", input: { l: 60.1708, c: 111.3956, h: 327.12 }, expected: { r: 255, g: 0, b: 255 } },
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

describe("CSS LCH to OKLCH conversion", () => {
  it("converts the D50 CSS LCH red reference directly to D65 OKLCH", () => {
    const result = new LchColorManager().parseStringOklch("lch(54.2943% 106.8519 40.855 / 25%)");

    expect(result?.l).toBeCloseTo(62.8, 1);
    expect(result?.c).toBeCloseTo(0.2577, 3);
    expect(result?.h).toBeCloseTo(29.23, 1);
    expect(result?.a).toBe(0.25);
  });

  it("accepts signed hue and rejects incomplete or invalid CSS input", () => {
    const manager = new LchColorManager(),
      resolved = manager.parseStringOklch("LCH(50% 20 -30 / 25%)");

    expect(resolved?.a).toBe(0.25);
    expect([resolved?.l, resolved?.c, resolved?.h].every(Number.isFinite)).toBe(true);
    expect(manager.parseStringOklch("lch(50% 20 -30) trailing")).toBeUndefined();
    expect(manager.parseStringOklch("lch(50% 20 -30 / 101%)")).toBeUndefined();
    expect(manager.parseString("lch(101% 20 -30)")).toBeUndefined();
  });

  it("parses CSS hue units and rejects an unsupported missing hue", () => {
    const manager = new LchColorManager(),
      expectedHue = manager.parseStringOklch("lch(50% 20 180)")?.h;

    for (const hue of ["180deg", "200grad", "3.141592653589793rad", ".5turn"]) {
      expect(manager.parseStringOklch(`lch(50% 20 ${hue})`)?.h).toBeCloseTo(expectedHue ?? 0, 10);
    }

    expect(manager.parseStringOklch("lch(50% 20 none)")).toBeUndefined();
  });

  it("accepts unitless lightness and percentage chroma using CSS reference scales", () => {
    const manager = new LchColorManager(),
      numeric = "lch(52.2345 72.2 56.2 / 25%)",
      percentChroma = "lch(52.2345% 48.13333333333333% 56.2 / 25%)",
      percentage = "lch(52.2345% 72.2 56.2 / 25%)";

    expect(manager.parseString(numeric)).toEqual(manager.parseString(percentage));
    expect(manager.parseString(percentChroma)).toEqual(manager.parseString(percentage));
    expect(manager.parseStringOklch(numeric)).toEqual(manager.parseStringOklch(percentage));
    expect(manager.parseStringOklch(percentChroma)).toEqual(manager.parseStringOklch(percentage));
  });

  it("rejects calc() and exponent notation", () => {
    const manager = new LchColorManager();

    expect(manager.parseString("lch(calc(50) 20 30)")).toBeUndefined();
    expect(manager.parseString("lch(5e1 20 30)")).toBeUndefined();
  });
});
