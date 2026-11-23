import { describe, expect, it } from "vitest";
import { getStyleFromOklch, mapOklchToDisplayP3, mapOklchToSrgb } from "@tsparticles/engine";
import { createCanvas } from "@napi-rs/canvas";

const max8BitChannel = 255,
  rgbaChannelCount = 4,
  maxRoundingDifference = 1;

describe("OKLCH canvas pixel readback", () => {
  const source = { a: 0.5, c: 0.27, h: 60, l: 76 },
    opacity = 0.4;

  for (const { colorSpace, map, name } of [
    { colorSpace: "srgb" as const, map: mapOklchToSrgb, name: "sRGB" },
    { colorSpace: "display-p3" as const, map: mapOklchToDisplayP3, name: "Display-P3" },
  ]) {
    it(`renders mapped ${name} output with alpha`, () => {
      const canvas = createCanvas(2, 2),
        context = canvas.getContext("2d", { colorSpace });

      expect(context.getContextAttributes().colorSpace).toBe(colorSpace);

      const style = getStyleFromOklch(source, false, opacity, undefined, undefined, colorSpace);

      expect(style.startsWith("oklch(")).toBe(true);
      context.fillStyle = style;
      expect(context.fillStyle.startsWith("oklch(")).toBe(true);
      context.fillRect(0, 0, 1, 1);

      const actual = [...context.getImageData(0, 0, 1, 1, { colorSpace }).data],
        mapped = map(source),
        expected = [mapped.rgb.r, mapped.rgb.g, mapped.rgb.b]
          .map(Math.round)
          .concat(Math.round(max8BitChannel * source.a * opacity));

      for (let channel = 0; channel < rgbaChannelCount; channel++) {
        expect(Math.abs(actual[channel] - expected[channel])).toBeLessThanOrEqual(maxRoundingDifference);
      }

      expect(source).toEqual({ a: 0.5, c: 0.27, h: 60, l: 76 });
    });
  }
});
