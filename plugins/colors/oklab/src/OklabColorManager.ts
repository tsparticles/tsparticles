import {
  type IColor,
  type IColorManager,
  type IOklab,
  type IRangeColor,
  type IRangeOklab,
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
import { oklabToRgb, oklabaToRgba } from "./utils.js";

const oklabRegex =
  /oklab\(\s*(\d+(?:\.\d+)?)(%?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

/** OKLAB color manager */
export class OklabColorManager implements IColorManager {
  /**
   * Checks if the input starts with oklab
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.startsWith("oklab");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IOklab);

    if (!("l" in oklabColor) || !("aAxis" in oklabColor) || !("bAxis" in oklabColor)) {
      return;
    }

    return oklabToRgb(oklabColor);
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IRangeOklab);

    if (!("l" in oklabColor) || !("aAxis" in oklabColor) || !("bAxis" in oklabColor)) {
      return;
    }

    return oklabToRgb({
      l: getRangeValue(oklabColor.l),
      aAxis: getRangeValue(oklabColor.aAxis),
      bAxis: getRangeValue(oklabColor.bAxis),
    });
  }

  /**
   * Parses an OKLAB color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = oklabRegex.exec(input),
      indexes = {
        l: 1,
        lPercent: 2,
        aAxis: 3,
        bAxis: 4,
        a: 5,
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

    return oklabaToRgba({
      a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
      l: rawL * (result[indexes.lPercent] ? identity : percentDenominator),
      aAxis: parseFloat(result[indexes.aAxis] ?? "0"),
      bAxis: parseFloat(result[indexes.bAxis] ?? "0"),
    });
  }
}
