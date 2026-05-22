import { describe, expect, it } from "vitest";
import type { IRgb } from "@tsparticles/engine";
import { NamedColorManager } from "./NamedColorManager.js";

describe("NamedColorManager", () => {
  const manager = new NamedColorManager(),
    testCases: { expected: IRgb; input: string; name: string }[] = [
      { name: "red", input: "red", expected: { r: 255, g: 0, b: 0 } },
      { name: "green", input: "lime", expected: { r: 0, g: 255, b: 0 } },
      { name: "blue", input: "blue", expected: { r: 0, g: 0, b: 255 } },
      { name: "yellow", input: "yellow", expected: { r: 255, g: 255, b: 0 } },
      { name: "cyan", input: "aqua", expected: { r: 0, g: 255, b: 255 } },
      { name: "magenta", input: "fuchsia", expected: { r: 255, g: 0, b: 255 } },
      { name: "white", input: "white", expected: { r: 255, g: 255, b: 255 } },
      { name: "black", input: "black", expected: { r: 0, g: 0, b: 0 } },
    ];

  for (const { name, input, expected } of testCases) {
    it(`should convert "${input}" to ${name}`, () => {
      const result = manager.handleColor({ value: input });
      expect(result).toMatchObject(expected);
    });
  }
});
