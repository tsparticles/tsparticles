import type { IOklch, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { getStyleFromOklch, oklchToRgb } from "./utils.js";
import { OklchColorManager } from "./OklchColorManager.js";

describe("OKLCH conversion", () => {
  const manager = new OklchColorManager();

  it("formats a CSS-compatible numeric hue in the legacy helper", () => {
    const color = { l: 50, c: 0.2, h: 270 };

    /* eslint-disable @typescript-eslint/no-deprecated -- Verify the supported legacy formatter output. */
    expect(getStyleFromOklch(color)).toBe("oklch(50% 0.2 270)");
    expect(getStyleFromOklch(color, 0.4)).toBe("oklch(50% 0.2 270 / 0.4)");
    expect(manager.parseStringOklch(getStyleFromOklch(color, 0.4))).toEqual({
      ...color,
      a: 0.4,
    });
    /* eslint-enable @typescript-eslint/no-deprecated */
  });

  describe("oklchToRgb (programmatic API)", () => {
    const testCases: {
      expected: IRgb;
      input: IOklch;
      name: string;
    }[] = [
      {
        name: "red",
        input: { l: 62.7955, c: 0.2577, h: 29.2339 },
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "green",
        input: { l: 86.644, c: 0.2948, h: 142.4953 },
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        name: "blue",
        input: { l: 45.2014, c: 0.3132, h: 264.052 },
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        name: "yellow",
        input: { l: 96.7983, c: 0.211, h: 109.7692 },
        expected: { r: 255, g: 255, b: 0 },
      },
      {
        name: "cyan",
        input: { l: 90.5399, c: 0.1546, h: 194.7689 },
        expected: { r: 0, g: 255, b: 255 },
      },
      {
        name: "magenta",
        input: { l: 70.1674, c: 0.3225, h: 328.3634 },
        expected: { r: 255, g: 0, b: 255 },
      },
      {
        name: "white",
        input: { l: 100, c: 0, h: 0 },
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        name: "black",
        input: { l: 0, c: 0, h: 0 },
        expected: { r: 0, g: 0, b: 0 },
      },
    ];

    for (const { name, input, expected } of testCases) {
      it(`should convert OKLCH(${input.l},${input.c},${input.h}) to ${name}`, () => {
        const result = oklchToRgb(input);

        expect(result).toEqual(expected);
      });
    }
  });

  describe("parseString (CSS string format)", () => {
    const stringCases: {
      expected: IRgb;
      input: string;
      name: string;
    }[] = [
      {
        name: "red",
        input: "oklch(62.7955% 0.2577 29.2339°)",
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "red (no % on L)",
        input: "oklch(0.627955 0.2577 29.2339°)",
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "green",
        input: "oklch(86.644% 0.2948 142.4953°)",
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        name: "blue",
        input: "oklch(45.2014% 0.3132 264.052°)",
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        name: "yellow",
        input: "oklch(96.7983% 0.211 109.7692°)",
        expected: { r: 255, g: 255, b: 0 },
      },
      {
        name: "cyan",
        input: "oklch(90.5399% 0.1546 194.7689°)",
        expected: { r: 0, g: 255, b: 255 },
      },
      {
        name: "magenta",
        input: "oklch(70.1674% 0.3225 328.3634°)",
        expected: { r: 255, g: 0, b: 255 },
      },
      {
        name: "white",
        input: "oklch(100% 0 0)",
        expected: { r: 255, g: 255, b: 255 },
      },
      { name: "black", input: "oklch(0% 0 0)", expected: { r: 0, g: 0, b: 0 } },
    ];

    for (const { name, input, expected } of stringCases) {
      it(`should parse "${input}" to ${name}`, () => {
        const result = manager.parseString(input);

        expect(result).toMatchObject(expected);
      });
    }

    it("preserves alpha and rejects trailing input or out-of-range alpha", () => {
      expect(manager.parseString("oklch(70% 0.2 30 / 37%)")?.a).toBe(0.37);
      expect(manager.parseString("oklch(70% 0.2 30) trailing")).toBeUndefined();
      expect(manager.parseString("oklch(70% 0.2 30 / 101%)")).toBeUndefined();
      expect(manager.parseString("OKLCH(70% 0.2 30 / 37%)")?.a).toBe(0.37);
    });
  });

  describe("canonical OKLCH manager output", () => {
    it("keeps decimal precision and alpha in direct string parsing", () => {
      const result = manager.parseStringOklch(
        "oklch(0.712345 0.123456 -12.345678 / 37%)",
      );

      expect(result).toEqual({
        a: 0.37,
        c: 0.123456,
        h: 347.654322,
        l: 71.2345,
      });
    });

    it("rejects trailing input and alpha outside the supported unit interval", () => {
      expect(
        manager.parseStringOklch("oklch(70% 0.2 30) trailing"),
      ).toBeUndefined();
      expect(
        manager.parseStringOklch("oklch(70% 0.2 30 / 101%)"),
      ).toBeUndefined();
    });

    it("parses CSS hue units and rejects an unsupported missing hue", () => {
      for (const hue of [
        "180deg",
        "200grad",
        "3.141592653589793rad",
        ".5turn",
      ]) {
        expect(
          manager.parseStringOklch(`oklch(70% 0.2 ${hue})`)?.h,
        ).toBeCloseTo(180, 10);
      }

      expect(manager.parseStringOklch("oklch(70% 0.2 none)")).toBeUndefined();
    });

    it("parses percentage chroma with the CSS reference scale", () => {
      const numeric = manager.parseStringOklch(
          "oklch(0.65125 0.13138 104.097 / 37%)",
        ),
        percentage = manager.parseStringOklch(
          "oklch(65.125% 32.845% 104.097 / 37%)",
        );

      expect(percentage).toEqual(numeric);
    });

    it("samples and normalizes an OKLCH range without converting through RGB", () => {
      const result = manager.handleRangeColorOklch({
        value: { oklch: { c: 0.123456, h: -12.5, l: 71.2345 } },
      });

      expect(result).toEqual({ a: 1, c: 0.123456, h: 347.5, l: 71.2345 });
    });

    it("rejects calc() and exponent notation", () => {
      expect(manager.parseString("oklch(calc(.5) .2 30)")).toBeUndefined();
      expect(manager.parseString("oklch(5e-1 .2 30)")).toBeUndefined();
    });
  });
});
