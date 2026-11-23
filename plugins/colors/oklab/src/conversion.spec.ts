import type { IColor, IOklab, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { OklabColorManager } from "./OklabColorManager.js";
import { oklabToRgb } from "./utils.js";

describe("OKLab conversion", () => {
  const testCases: {
    expected: IRgb;
    input: IOklab;
    name: string;
  }[] = [
    {
      name: "red",
      input: { l: 62.7955, aAxis: 0.2249, bAxis: 0.1258 },
      expected: { r: 255, g: 0, b: 0 },
    },
    {
      name: "green",
      input: { l: 86.644, aAxis: -0.2339, bAxis: 0.1795 },
      expected: { r: 0, g: 255, b: 0 },
    },
    {
      name: "blue",
      input: { l: 45.2014, aAxis: -0.0325, bAxis: -0.3115 },
      expected: { r: 0, g: 0, b: 255 },
    },
    {
      name: "yellow",
      input: { l: 96.7983, aAxis: -0.0714, bAxis: 0.1986 },
      expected: { r: 255, g: 255, b: 0 },
    },
    {
      name: "cyan",
      input: { l: 90.5399, aAxis: -0.14944, bAxis: -0.0394 },
      expected: { r: 0, g: 255, b: 255 },
    },
    {
      name: "magenta",
      input: { l: 70.1674, aAxis: 0.2746, bAxis: -0.1692 },
      expected: { r: 255, g: 0, b: 255 },
    },
    {
      name: "white",
      input: { l: 100, aAxis: 0, bAxis: 0 },
      expected: { r: 255, g: 255, b: 255 },
    },
    {
      name: "black",
      input: { l: 0, aAxis: 0, bAxis: 0 },
      expected: { r: 0, g: 0, b: 0 },
    },
  ];

  for (const { name, input, expected } of testCases) {
    it(`should convert OKLab(${input.l},${input.aAxis},${input.bAxis}) to ${name}`, () => {
      const result = oklabToRgb(input);

      expect(result).toEqual(expected);
    });
  }

  describe("canonical OKLCH manager output", () => {
    const manager = new OklabColorManager();

    it("converts programmatic OKLab directly to normalized OKLCH", () => {
      const result = manager.handleColorOklch({
        value: { oklab: { aAxis: 0.1, bAxis: -0.2, l: 60 } },
      });

      expect(result?.a).toBe(1);
      expect(result?.c).toBeCloseTo(Math.hypot(0.1, -0.2), 12);
      expect(result?.h).toBeCloseTo(296.565051177078, 9);
      expect(result?.l).toBe(60);
    });

    it("rejects programmatic OKLab alpha outside the supported interval", () => {
      expect(
        manager.handleColorOklch({
          value: { oklab: { a: 1.01, aAxis: 0.1, bAxis: -0.2, l: 60 } },
        } as IColor),
      ).toBeUndefined();
    });

    it("parses CSS OKLab to OKLCH without quantized RGB and preserves alpha", () => {
      const result = manager.parseStringOklch("oklab(0.6 0.1 -0.2 / 25%)");

      expect(result?.a).toBe(0.25);
      expect(result?.c).toBeCloseTo(Math.hypot(0.1, -0.2), 12);
      expect(result?.h).toBeCloseTo(296.565051177078, 9);
      expect(result?.l).toBe(60);
    });

    it("accepts signed and leading-decimal channels, and rejects trailing text or invalid alpha", () => {
      const manager = new OklabColorManager();

      expect(manager.parseStringOklch("OKLAB(+.6 +.1 -.2 / 25%)")).toMatchObject({
        a: 0.25,
        l: 60,
      });
      expect(manager.parseString("oklab(0.6 0.1 -0.2) trailing")).toBeUndefined();
      expect(manager.parseStringOklch("oklab(0.6 0.1 -0.2 / 101%)")).toBeUndefined();
      expect(manager.parseString("oklab(0.6 0.1 -0.2 / 101%)")).toBeUndefined();
    });

    it("parses percentage a/b axes with the CSS reference scale", () => {
      const numeric = manager.parseStringOklch("oklab(0.65125 -0.032 0.1274 / 37%)"),
        percentages = manager.parseStringOklch("oklab(65.125% -8% 31.85% / 37%)");

      expect(percentages).toEqual(numeric);
    });

    it("rejects calc() and exponent notation", () => {
      const manager = new OklabColorManager();

      expect(manager.parseString("oklab(calc(.5) 0 0)")).toBeUndefined();
      expect(manager.parseString("oklab(5e-1 0 0)")).toBeUndefined();
    });
  });
});
