import type { IOklch, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { OklchColorManager } from "./OklchColorManager.js";
import { oklchToRgb } from "./utils.js";

describe("OKLCH conversion", () => {
  const manager = new OklchColorManager();

  describe("oklchToRgb (programmatic API)", () => {
    const testCases: {
      expected: IRgb;
      input: IOklch;
      name: string;
    }[] = [
      { name: "red", input: { l: 62.7955, c: 0.2577, h: 29.2339 }, expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: { l: 86.644, c: 0.2948, h: 142.4953 }, expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: { l: 45.2014, c: 0.3132, h: 264.052 }, expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: { l: 96.7983, c: 0.211, h: 109.7692 }, expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: { l: 90.5399, c: 0.1546, h: 194.7689 }, expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: { l: 70.1674, c: 0.3225, h: 328.3634 }, expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: { l: 100, c: 0, h: 0 }, expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: { l: 0, c: 0, h: 0 }, expected: { r: 0, g: 0, b: 0 } },
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
      { name: "red", input: "oklch(62.7955% 0.2577 29.2339°)", expected: { r: 255, g: 0, b: 0 } },
      { name: "red (no % on L)", input: "oklch(0.627955 0.2577 29.2339°)", expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: "oklch(86.644% 0.2948 142.4953°)", expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: "oklch(45.2014% 0.3132 264.052°)", expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: "oklch(96.7983% 0.211 109.7692°)", expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: "oklch(90.5399% 0.1546 194.7689°)", expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: "oklch(70.1674% 0.3225 328.3634°)", expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: "oklch(100% 0 0)", expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: "oklch(0% 0 0)", expected: { r: 0, g: 0, b: 0 } },
    ];

    for (const { name, input, expected } of stringCases) {
      it(`should parse "${input}" to ${name}`, () => {
        const result = manager.parseString(input);
        expect(result).toMatchObject(expected);
      });
    }
  });
});
