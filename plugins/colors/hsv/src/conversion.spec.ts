import type { IHsv, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { HsvColorManager } from "./HsvColorManager.js";

describe("HsvColorManager", () => {
  const manager = new HsvColorManager(),
    testCases: {
      expected: IRgb;
      input: IHsv;
      name: string;
    }[] = [
      {
        name: "red",
        input: { h: 0, s: 100, v: 100 },
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        name: "green",
        input: { h: 120, s: 100, v: 100 },
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        name: "blue",
        input: { h: 240, s: 100, v: 100 },
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        name: "yellow",
        input: { h: 60, s: 100, v: 100 },
        expected: { r: 255, g: 255, b: 0 },
      },
      {
        name: "cyan",
        input: { h: 180, s: 100, v: 100 },
        expected: { r: 0, g: 255, b: 255 },
      },
      {
        name: "magenta",
        input: { h: 300, s: 100, v: 100 },
        expected: { r: 255, g: 0, b: 255 },
      },
      {
        name: "white",
        input: { h: 0, s: 0, v: 100 },
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        name: "black",
        input: { h: 0, s: 0, v: 0 },
        expected: { r: 0, g: 0, b: 0 },
      },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert HSV(${input.h}°,${input.s}%,${input.v}%) to ${name}`, () => {
      const result = manager.handleColor({ value: input });

      expect(result).toMatchObject(expected);
    });
  }

  it("parses legacy integer HSV syntax and preserves alpha for canonical output", () => {
    const rgba = manager.parseString("hsva(210°, 35%, 42%, 37%)"),
      oklch = manager.parseStringOklch("hsva(210°, 35%, 42%, 37%)");

    expect(rgba?.a).toBe(0.37);
    expect(oklch?.a).toBe(0.37);
    expect(manager.parseString("hsv(210° 35% 42%)")?.a).toBe(1);
  });

  it("rejects incomplete, fractional, out-of-range, or trailing HSV input", () => {
    for (const input of [
      "hsv(210°, 35%)",
      "hsv(210°, 35.5%, 42%)",
      "hsv(210°, 101%, 42%)",
      "hsv(210°, 35%, 42%, 101%)",
      "hsv(210°, 35%, 42%) trailing",
    ]) {
      expect(manager.parseString(input), input).toBeUndefined();
      expect(manager.parseStringOklch(input), input).toBeUndefined();
    }
  });

  it("rejects calc() and exponent notation", () => {
    expect(manager.parseString("hsv(calc(0)°, 35%, 42%)")).toBeUndefined();
    expect(manager.parseString("hsv(2e2°, 35%, 42%)")).toBeUndefined();
  });
});
