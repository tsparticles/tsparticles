import { type IRgb, createEngine } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { NamedColorManager } from "./NamedColorManager.js";

describe("NamedColorManager", () => {
  const manager = new NamedColorManager(createEngine()),
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

  it("parses color names case-insensitively and preserves transparent alpha", () => {
    expect(manager.parseString("ReD")).toEqual({ a: 1, b: 0, g: 0, r: 255 });
    expect(manager.parseStringOklch("TRANSPARENT")?.a).toBe(0);
    expect(manager.parseString("transparent")).toEqual({
      a: 0,
      b: 0,
      g: 0,
      r: 0,
    });
    expect(manager.accepts("transparent")).toBe(true);
    expect(manager.handleColorOklch({ value: "transparent" })?.a).toBe(0);
  });

  it("rejects unknown names and trailing input", () => {
    expect(manager.parseString("not-a-color")).toBeUndefined();
    expect(manager.parseString("red ")).toBeUndefined();
  });
});
