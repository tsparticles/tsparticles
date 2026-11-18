import {
  type IColor,
  type IColorManager,
  type IHsv,
  type IOklcha,
  type IRangeColor,
  type IRangeHsv,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  identity,
  none,
  parseAlpha,
  percentDenominator,
  rgbToOklch,
} from "@tsparticles/engine";
import { hsvToRgb, hsvToRgbFloat, hsvaToRgba } from "./utils.js";

const hsvRegex =
  /^hsva?\(\s*([+-]?\d+)°\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)$/i;

/** HSV color manager */
export class HsvColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with hsv
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.toLowerCase().startsWith("hsv");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    return hsvToRgb(hsvColor);
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    const alpha = (hsvColor as IHsv & { a?: number }).a ?? defaultAlpha;

    return { ...rgbToOklch(hsvToRgbFloat(hsvColor)), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IRangeHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    return hsvToRgb({
      h: getRangeValue(hsvColor.h, this.#random),
      s: getRangeValue(hsvColor.s, this.#random),
      v: getRangeValue(hsvColor.v, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      hsvColor = colorValue.hsv ?? (color.value as IRangeHsv);

    if (!("h" in hsvColor) || !("s" in hsvColor) || !("v" in hsvColor)) {
      return;
    }

    const resolved = {
      h: getRangeValue(hsvColor.h, this.#random),
      s: getRangeValue(hsvColor.s, this.#random),
      v: getRangeValue(hsvColor.v, this.#random),
    };

    return { ...rgbToOklch(hsvToRgbFloat(resolved)), a: defaultAlpha };
  }

  /**
   * Parses an HSV color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
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
      radix = 10;

    if (!result) {
      return;
    }

    const hsv = {
      a: result.length > fullLength ? parseAlpha(result[indexes.a]) : defaultAlpha,
      h: Number.parseInt(result[indexes.h] ?? "0", radix),
      s: Number.parseInt(result[indexes.s] ?? "0", radix),
      v: Number.parseInt(result[indexes.v] ?? "0", radix),
    };

    return [hsv.h, hsv.s, hsv.v, hsv.a].every(Number.isFinite) &&
      hsv.s >= none &&
      hsv.s <= percentDenominator &&
      hsv.v >= none &&
      hsv.v <= percentDenominator &&
      hsv.a >= none &&
      hsv.a <= identity
      ? hsvaToRgba(hsv)
      : undefined;
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hsvRegex.exec(input),
      fullLength = 4,
      indexes = { h: 1, s: 2, v: 3, a: 5 },
      radix = 10;

    if (!result) {
      return;
    }

    const hsv = {
        h: Number.parseInt(result[indexes.h] ?? "0", radix),
        s: Number.parseInt(result[indexes.s] ?? "0", radix),
        v: Number.parseInt(result[indexes.v] ?? "0", radix),
      },
      alpha = result.length > fullLength ? parseAlpha(result[indexes.a]) : defaultAlpha;

    if (
      ![hsv.h, hsv.s, hsv.v, alpha].every(Number.isFinite) ||
      hsv.s < none ||
      hsv.s > percentDenominator ||
      hsv.v < none ||
      hsv.v > percentDenominator ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return { ...rgbToOklch(hsvToRgbFloat(hsv)), a: alpha };
  }
}
