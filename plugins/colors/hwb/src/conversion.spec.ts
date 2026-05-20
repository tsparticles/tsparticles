import type { IColor, IHwb, IRgb } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { HwbColorManager } from "./HwbColorManager.js";

describe("HwbColorManager", () => {
  const manager = new HwbColorManager(),
    testCases: {
      expected: IRgb;
      input: IHwb;
      name: string;
    }[] = [
      { name: "red", input: { h: 0, w: 0, b: 0 }, expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: { h: 120, w: 0, b: 0 }, expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: { h: 240, w: 0, b: 0 }, expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: { h: 60, w: 0, b: 0 }, expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: { h: 180, w: 0, b: 0 }, expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: { h: 300, w: 0, b: 0 }, expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: { h: 0, w: 100, b: 0 }, expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: { h: 0, w: 0, b: 100 }, expected: { r: 0, g: 0, b: 0 } },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert HWB(${input.h},${input.w}%,${input.b}%) to ${name}`, () => {
      const color: IColor = { value: { hwb: input } },
        result = manager.handleColor(color);
      expect(result).toMatchObject(expected);
    });
  }
});
