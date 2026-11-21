import {
  type IColor,
  type IColorManager,
  type IOklch,
  type IOklcha,
  type IRangeColor,
  type IRangeOklch,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  hMax,
  identity,
  none,
  parseAlpha,
  percentDenominator,
} from "@tsparticles/engine";
import { oklchToRgb, oklchaToRgba } from "./utils.js";

const oklchRegex =
    /^oklch\(\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:deg|°|rad|grad|turn)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i,
  gradsPerTurn = 400,
  oklchChromaPercentScale = 0.004;

function parseOklchHue(input: string): number {
  const value = Number.parseFloat(input),
    unit = /(deg|°|rad|grad|turn)$/iu.exec(input)?.[1]?.toLowerCase();

  switch (unit) {
    case "rad":
      return (value * hMax) / (2 * Math.PI);
    case "grad":
      return (value * hMax) / gradsPerTurn;
    case "turn":
      return value * hMax;
    default:
      return value;
  }
}

function parseOklchString(input: string): IOklcha | undefined {
  const result = oklchRegex.exec(input);

  if (!result) {
    return;
  }

  const rawL = Number.parseFloat(result[1] ?? "0"),
    lightness = rawL * (result[2] ? identity : percentDenominator),
    chroma =
      Number.parseFloat(result[3] ?? "0") *
      (result[4] ? oklchChromaPercentScale : 1),
    hue = parseOklchHue(result[5] ?? "0"),
    alpha = result[6] ? parseAlpha(result[6]) : defaultAlpha;

  if (
    ![lightness, chroma, hue, alpha].every(Number.isFinite) ||
    rawL < none ||
    rawL > (result[2] ? percentDenominator : identity) ||
    chroma < none ||
    alpha < none ||
    alpha > identity
  ) {
    return;
  }

  return { a: alpha, c: chroma, h: ((hue % hMax) + hMax) % hMax, l: lightness };
}

/** OKLCH color manager */
export class OklchColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with oklch
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return /^oklch/i.test(input);
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

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      oklchColor = colorValue.oklch ?? (color.value as IOklch);

    if (!("l" in oklchColor) || !("c" in oklchColor) || !("h" in oklchColor)) {
      return;
    }

    const alpha = (oklchColor as { a?: number }).a ?? defaultAlpha;

    if (
      ![alpha, oklchColor.c, oklchColor.h, oklchColor.l].every(
        Number.isFinite,
      ) ||
      alpha < none ||
      alpha > identity ||
      oklchColor.c < none ||
      oklchColor.l < none ||
      oklchColor.l > percentDenominator
    ) {
      return;
    }

    return {
      a: alpha,
      c: oklchColor.c,
      h: ((oklchColor.h % hMax) + hMax) % hMax,
      l: oklchColor.l,
    };
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
      l: getRangeValue(oklchColor.l, this.#random),
      c: getRangeValue(oklchColor.c, this.#random),
      h: getRangeValue(oklchColor.h, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklchColor = colorValue.oklch ?? (color.value as IRangeOklch);

    if (!("l" in oklchColor) || !("c" in oklchColor) || !("h" in oklchColor)) {
      return;
    }

    const l = getRangeValue(oklchColor.l, this.#random),
      c = getRangeValue(oklchColor.c, this.#random),
      h = getRangeValue(oklchColor.h, this.#random);

    if (
      ![l, c, h].every(Number.isFinite) ||
      c < none ||
      l < none ||
      l > percentDenominator
    ) {
      return;
    }

    return { a: defaultAlpha, c, h: ((h % hMax) + hMax) % hMax, l };
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

    const color = parseOklchString(input);

    return color ? oklchaToRgba(color) : undefined;
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    return parseOklchString(input);
  }
}
