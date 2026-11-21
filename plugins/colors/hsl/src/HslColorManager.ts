import {
  type IColor,
  type IColorManager,
  type IHsl,
  type IOklcha,
  type IRangeColor,
  type IRangeHsl,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  hslToRgb,
  hslToRgbFloat,
  hslaToRgba,
  identity,
  none,
  parseAlpha,
  percentDenominator,
  rgbToOklch,
} from "@tsparticles/engine";

/** Indexes for HSL regex capture groups */
enum HslIndexes {
  /** Hue component index */
  h = 1,
  /** Saturation component index */
  s = 2,
  /** Lightness component index */
  l = 3,
  /** Alpha component index */
  a = 4,
}

const hslRegex =
    /^hsla?\(\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:deg|°|rad|grad|turn)?)\s*[\s,]\s*(\d+(?:\.\d*)?)%\s*[\s,]\s*(\d+(?:\.\d*)?)%(?:(?:\s*(?:\/|,)\s*|\s+)(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i,
  maxDegrees = 360,
  gradsPerTurn = 400,
  radiansPerTurn = 2,
  degreesPerRadian = maxDegrees / (Math.PI * radiansPerTurn),
  degreesPerGrad = maxDegrees / gradsPerTurn;

function parseHslHue(input: string): number {
  const value = Number.parseFloat(input),
    unit = /(deg|°|rad|grad|turn)$/iu.exec(input)?.[1]?.toLowerCase();

  switch (unit) {
    case "rad":
      return value * degreesPerRadian;
    case "grad":
      return value * degreesPerGrad;
    case "turn":
      return value * maxDegrees;
    default:
      return value;
  }
}

/** HSL color manager */
export class HslColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with hsl
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.toLowerCase().startsWith("hsl");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hslColor = colorValue.hsl ?? (color.value as IHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    return hslToRgb(hslColor);
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      hslColor = colorValue.hsl ?? (color.value as IHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    const alpha = (hslColor as IHsl & { a?: number }).a ?? defaultAlpha;

    return { ...rgbToOklch(hslToRgbFloat(hslColor)), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      hslColor = colorValue.hsl ?? (color.value as IRangeHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    return hslToRgb({
      h: getRangeValue(hslColor.h, this.#random),
      l: getRangeValue(hslColor.l, this.#random),
      s: getRangeValue(hslColor.s, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      hslColor = colorValue.hsl ?? (color.value as IRangeHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    const resolved = {
      h: getRangeValue(hslColor.h, this.#random),
      l: getRangeValue(hslColor.l, this.#random),
      s: getRangeValue(hslColor.s, this.#random),
    };

    return { ...rgbToOklch(hslToRgbFloat(resolved)), a: defaultAlpha };
  }

  /**
   * Parses an HSL color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hslRegex.exec(input),
      alpha = result?.[HslIndexes.a]
        ? parseAlpha(result[HslIndexes.a])
        : defaultAlpha;

    if (!result) {
      return;
    }

    const hsl = {
      a: alpha,
      h: parseHslHue(result[HslIndexes.h] ?? "0"),
      l: Number.parseFloat(result[HslIndexes.l] ?? "0"),
      s: Number.parseFloat(result[HslIndexes.s] ?? "0"),
    };

    return [hsl.h, hsl.l, hsl.s, hsl.a].every(Number.isFinite) &&
      hsl.l >= none &&
      hsl.l <= percentDenominator &&
      hsl.s >= none &&
      hsl.s <= percentDenominator &&
      hsl.a >= none &&
      hsl.a <= identity
      ? hslaToRgba(hsl)
      : undefined;
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hslRegex.exec(input);

    if (!result) {
      return;
    }

    const hsl = {
        h: parseHslHue(result[HslIndexes.h] ?? "0"),
        l: Number.parseFloat(result[HslIndexes.l] ?? "0"),
        s: Number.parseFloat(result[HslIndexes.s] ?? "0"),
      },
      alpha = result[HslIndexes.a]
        ? parseAlpha(result[HslIndexes.a])
        : defaultAlpha;

    if (
      ![hsl.h, hsl.l, hsl.s, alpha].every(Number.isFinite) ||
      hsl.l < none ||
      hsl.l > percentDenominator ||
      hsl.s < none ||
      hsl.s > percentDenominator ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return { ...rgbToOklch(hslToRgbFloat(hsl)), a: alpha };
  }
}
