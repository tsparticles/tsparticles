import { describe, expect, it } from "vitest";
import type { IRgb } from "@tsparticles/engine";
import { RgbColorManager } from "./RgbColorManager.js";

describe("RgbColorManager", () => {
  const manager = new RgbColorManager(() => 0.5),
    testCases: {
      expected: IRgb;
      input: IRgb;
      name: string;
    }[] = [
      {
        name: "red",
        input: { r: 255, g: 0, b: 0 },
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "green",
        input: { r: 0, g: 255, b: 0 },
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        name: "blue",
        input: { r: 0, g: 0, b: 255 },
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        name: "yellow",
        input: { r: 255, g: 255, b: 0 },
        expected: { r: 255, g: 255, b: 0 },
      },
      {
        name: "cyan",
        input: { r: 0, g: 255, b: 255 },
        expected: { r: 0, g: 255, b: 255 },
      },
      {
        name: "magenta",
        input: { r: 255, g: 0, b: 255 },
        expected: { r: 255, g: 0, b: 255 },
      },
      {
        name: "white",
        input: { r: 255, g: 255, b: 255 },
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        name: "black",
        input: { r: 0, g: 0, b: 0 },
        expected: { r: 0, g: 0, b: 0 },
      },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert RGB(${input.r},${input.g},${input.b}) to ${name}`, () => {
      const result = manager.handleColor({ value: input });

      expect(result).toMatchObject(expected);
    });
  }

  it("parses CSS percentages, decimal channels, and modern slash alpha", () => {
    expect(manager.parseString("rgb(100% 0% 0% / 25%)")).toEqual({
      a: 0.25,
      b: 0,
      g: 0,
      r: 255,
    });
    expect(manager.parseString("RGB(50.5% 0% 0% / .5)")).toEqual({
      a: 0.5,
      b: 0,
      g: 0,
      r: 128.775,
    });
    expect(manager.parseString("rgba(255, 0, 0, 0.25)")?.a).toBe(0.25);
    expect(manager.parseString("rgba(255 0 0 0.25)")?.a).toBe(0.25);
  });

  it("rejects invalid CSS percentage channels and trailing text", () => {
    expect(manager.parseString("rgb(101% 0% 0%)")).toBeUndefined();
    expect(manager.parseString("rgb(255 0 0) trailing")).toBeUndefined();
  });

  it("rejects calc() and exponent notation", () => {
    expect(manager.parseString("rgb(calc(100) 0 0)")).toBeUndefined();
    expect(manager.parseString("rgb(1e2 0 0)")).toBeUndefined();
  });

  it("samples optional ranged alpha after RGB channels for canonical resolution", () => {
    const rangeManager = new RgbColorManager(() => 0.5),
      color = rangeManager.handleRangeColorOklch({
        value: {
          a: { min: 0, max: 1 },
          b: 0,
          g: 0,
          r: 255,
        },
      });

    expect(color?.a).toBe(0.5);
    expect(color?.l).toBeGreaterThan(0);
  });
});
