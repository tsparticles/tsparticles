import {
  type IColor,
  type IColorManager,
  type IHsv,
  type IRangeColor,
  type IRangeHsv,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  parseAlpha,
} from "@tsparticles/engine";
import { hsvToRgb, hsvaToRgba } from "./utils.js";

const hsvRegex = /hsva?\(\s*(\d+)°\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;

/** HSV color manager */
export class HsvColorManager implements IColorManager {
  /**
   * Checks if the input starts with hsv
   * @param input
   */
  accepts(input: string): boolean {
    return input.startsWith("hsv");
  }

  /**
   * Converts an IColor to RGB
   * @param color
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    return hsvToRgb(hsvColor);
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IRangeHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    return hsvToRgb({
      h: getRangeValue(hsvColor.h),
      s: getRangeValue(hsvColor.s),
      v: getRangeValue(hsvColor.v),
    });
  }

  /**
   * Parses an HSV color string to RGBA
   * @param input
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hsvRegex.exec(input),
      fullLength = 4,
      indexes = {
        h: 1,
        s: 2,
        v: 3,
        a: 5,
      },
      defaultAlpha = 1,
      radix = 10;

    return result
      ? hsvaToRgba({
          a: result.length > fullLength ? parseAlpha(result[indexes.a]) : defaultAlpha,
          h: parseInt(result[indexes.h] ?? "0", radix),
          s: parseInt(result[indexes.s] ?? "0", radix),
          v: parseInt(result[indexes.v] ?? "0", radix),
        })
      : undefined;
  }
}
