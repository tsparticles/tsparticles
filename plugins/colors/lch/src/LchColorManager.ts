import {
  type IColor,
  type IColorManager,
  type ILch,
  type IRangeColor,
  type IRangeLch,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  parseAlpha,
} from "@tsparticles/engine";
import { lchToRgb, lchaToRgba } from "./utils.js";

const lchRegex = /lch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

export class LchColorManager implements IColorManager {
  accepts(input: string): boolean {
    return input.startsWith("lch");
  }

  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      lchColor = colorValue.lch ?? (color.value as ILch);

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    return lchToRgb(lchColor); // Handle LCH conversion
  }

  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      lchColor = colorValue.lch ?? (color.value as IRangeLch); // Support for LCH

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    return lchToRgb({
      l: getRangeValue(lchColor.l),
      c: getRangeValue(lchColor.c),
      h: getRangeValue(lchColor.h),
    });
  }

  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = lchRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        c: 3, // Chroma
        h: 5, // Hue
        a: 7, // Optional alpha for LCH
      },
      defaultAlpha = 1;

    return result
      ? lchaToRgba({
          a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
          c: parseFloat(result[indexes.c] ?? "0"),
          h: parseFloat(result[indexes.h] ?? "0"),
          l: parseFloat(result[indexes.l] ?? "0"),
        })
      : undefined; // LCH parsing without alpha
  }
}
