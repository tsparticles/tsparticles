import type { IHsl, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { HslColorManager } from "./HslColorManager.js";

describe("HslColorManager", () => {
  const manager = new HslColorManager(() => 0.5),
    testCases: {
      expected: IRgb;
      input: IHsl;
      name: string;
    }[] = [
      {
        name: "red",
        input: { h: 0, s: 100, l: 50 },
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "green",
        input: { h: 120, s: 100, l: 50 },
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        name: "blue",
        input: { h: 240, s: 100, l: 50 },
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        name: "yellow",
        input: { h: 60, s: 100, l: 50 },
        expected: { r: 255, g: 255, b: 0 },
      },
      {
        name: "cyan",
        input: { h: 180, s: 100, l: 50 },
        expected: { r: 0, g: 255, b: 255 },
      },
      {
        name: "magenta",
        input: { h: 300, s: 100, l: 50 },
        expected: { r: 255, g: 0, b: 255 },
      },
      {
        name: "white",
        input: { h: 0, s: 0, l: 100 },
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        name: "black",
        input: { h: 0, s: 0, l: 0 },
        expected: { r: 0, g: 0, b: 0 },
      },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert HSL(${input.h},${input.s}%,${input.l}%) to ${name}`, () => {
      const result = manager.handleColor({ value: input });

      expect(result).toMatchObject(expected);
    });
  }

  it("parses CSS hue units, fractional components, and modern slash alpha", () => {
    const expected = manager.parseString("hsl(120deg 100% 50% / 25%)");

    expect(manager.parseString("hsl(2.094395102rad 100% 50% / 25%)")).toMatchObject(expected ?? {});
    expect(manager.parseString("hsl(133.333333grad 100% 50% / 25%)")).toMatchObject(expected ?? {});
    expect(manager.parseString("hsl(.333333turn 100% 50% / 25%)")).toMatchObject(expected ?? {});
    expect(manager.parseString("hsl(120 99.5% 50.5% / 25%)")?.a).toBe(0.25);
  });

  it("preserves legacy comma alpha and rejects unsupported missing hue", () => {
    expect(manager.parseString("hsla(120, 100%, 50%, 25%)")?.a).toBe(0.25);
    expect(manager.parseString("hsl(none 100% 50%)")).toBeUndefined();
  });

  it("rejects calc() and exponent notation", () => {
    expect(manager.parseString("hsl(calc(0) 100% 50%)")).toBeUndefined();
    expect(manager.parseString("hsl(1e2 100% 50%)")).toBeUndefined();
  });
});
