import {
  type IColor,
  type IColorManager,
  type IOklcha,
  type IRangeColor,
  type IRangeRgb,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  identity,
  none,
  parseAlpha,
  percentDenominator,
  rgbMax,
  rgbToOklch,
} from "@tsparticles/engine";

/** Indexes for RGB regex capture groups */
enum RgbIndexes {
  /** Red component index */
  r = 1,
  /** Red percentage suffix index */
  rPercent = 2,
  /** Green component index */
  g = 3,
  /** Green percentage suffix index */
  gPercent = 4,
  /** Blue component index */
  b = 5,
  /** Blue percentage suffix index */
  bPercent = 6,
  /** Alpha component index */
  a = 7,
}

const rgbRegex =
  /^rgba?\(\s*(\d+(?:\.\d*)?|\.\d+)(%)?\s*[\s,]\s*(\d+(?:\.\d*)?|\.\d+)(%)?\s*[\s,]\s*(\d+(?:\.\d*)?|\.\d+)(%)?(?:(?:\s*(?:\/|,)\s*|\s+)(0|1|0?\.\d+|\d+(?:\.\d*)?%))?\s*\)$/i;

/** RGB color manager */
export class RgbColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with rgb
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.toLowerCase().startsWith("rgb");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    return rgbColor;
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    const alpha = (rgbColor as IRgb & { a?: number }).a ?? defaultAlpha;

    return { ...rgbToOklch(rgbColor), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRangeRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    return {
      r: getRangeValue(rgbColor.r, this.#random),
      g: getRangeValue(rgbColor.g, this.#random),
      b: getRangeValue(rgbColor.b, this.#random),
    };
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRangeRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    const rgb = {
      r: getRangeValue(rgbColor.r, this.#random),
      g: getRangeValue(rgbColor.g, this.#random),
      b: getRangeValue(rgbColor.b, this.#random),
    };

    return { ...rgbToOklch(rgb), a: defaultAlpha };
  }

  /**
   * Parses an RGB color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = rgbRegex.exec(input);

    if (!result) {
      return;
    }

    const rgba = {
      a: result[RgbIndexes.a] ? parseAlpha(result[RgbIndexes.a]) : defaultAlpha,
      b: result[RgbIndexes.bPercent]
        ? (Number.parseFloat(result[RgbIndexes.b] ?? "0") * rgbMax) / percentDenominator
        : Number.parseFloat(result[RgbIndexes.b] ?? "0"),
      g: result[RgbIndexes.gPercent]
        ? (Number.parseFloat(result[RgbIndexes.g] ?? "0") * rgbMax) / percentDenominator
        : Number.parseFloat(result[RgbIndexes.g] ?? "0"),
      r: result[RgbIndexes.rPercent]
        ? (Number.parseFloat(result[RgbIndexes.r] ?? "0") * rgbMax) / percentDenominator
        : Number.parseFloat(result[RgbIndexes.r] ?? "0"),
    };

    return [rgba.r, rgba.g, rgba.b, rgba.a].every(Number.isFinite) &&
      rgba.r >= none &&
      rgba.r <= rgbMax &&
      rgba.g >= none &&
      rgba.g <= rgbMax &&
      rgba.b >= none &&
      rgba.b <= rgbMax &&
      rgba.a >= none &&
      rgba.a <= identity
      ? rgba
      : undefined;
  }

  parseStringOklch(input: string): IOklcha | undefined {
    const rgba = this.parseString(input);

    return rgba ? { ...rgbToOklch(rgba), a: rgba.a } : undefined;
  }
}
