import {
  type IColor,
  type IColorManager,
  type IOklch,
  type IRangeColor,
  type IRangeOklch,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  parseAlpha,
} from "@tsparticles/engine";
import { oklchToRgb, oklchaToRgba } from "./utils.js";

const oklchRegex =
  /oklch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(°)?(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

export class OklchColorManager implements IColorManager {
  accepts(input: string): boolean {
    return input.startsWith("oklch");
  }

  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      oklchColor = colorValue.oklch ?? (color.value as IOklch);

    if (!("l" in oklchColor) || !("c" in oklchColor) || !("h" in oklchColor)) {
      return;
    }

    return oklchToRgb(oklchColor);
  }

  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklchColor = colorValue.oklch ?? (color.value as IRangeOklch);

    if (!("l" in oklchColor) || !("c" in oklchColor) || !("h" in oklchColor)) {
      return;
    }

    return oklchToRgb({
      l: getRangeValue(oklchColor.l),
      c: getRangeValue(oklchColor.c),
      h: getRangeValue(oklchColor.h),
    });
  }

  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = oklchRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        c: 3, // Chroma
        h: 5, // Hue
        a: 7, // Optional alpha for OKLCH
      },
      defaultAlpha = 1;

    return result
      ? oklchaToRgba({
          a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
          c: parseFloat(result[indexes.c] ?? "0"), // Chroma
          h: parseFloat(result[indexes.h] ?? "0"), // Hue
          l: parseFloat(result[indexes.l] ?? "0"), // Lightness
        })
      : undefined; // OKLCH parsing without alpha
  }
}
