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
  identity,
  none,
  parseAlpha,
  percentDenominator,
} from "@tsparticles/engine";
import { oklchToRgb, oklchaToRgba } from "./utils.js";

const oklchRegex =
  /oklch\(\s*(\d+(?:\.\d+)?)(%?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)(°)?(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

/** OKLCH color manager */
export class OklchColorManager implements IColorManager {
  /**
   * Checks if the input starts with oklch
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.startsWith("oklch");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      oklchColor = colorValue.oklch ?? (color.value as IOklch);

    if (!("l" in oklchColor) || !("c" in oklchColor) || !("h" in oklchColor)) {
      return;
    }

    return oklchToRgb(oklchColor);
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
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

  /**
   * Parses an OKLCH color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = oklchRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        lPercent: 2, // % after lightness
        c: 3, // Chroma
        h: 4, // Hue
        a: 6, // Optional alpha for OKLCH
      },
      defaultAlpha = 1;

    if (!result) {
      return undefined;
    }

    const rawL = parseFloat(result[indexes.l] ?? "0");

    // Validate lightness range BEFORE scaling
    if (result[indexes.lPercent]) {
      // Percentage format: must be 0..100
      if (rawL < none || rawL > percentDenominator) {
        return undefined;
      }
    } else {
      // Unitless format: must be 0..1
      if (rawL < none || rawL > identity) {
        return undefined;
      }
    }

    return oklchaToRgba({
      a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
      c: parseFloat(result[indexes.c] ?? "0"),
      h: parseFloat(result[indexes.h] ?? "0"),
      l: rawL * (result[indexes.lPercent] ? identity : percentDenominator),
    });
  }
}
