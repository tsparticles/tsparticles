import {
  type IColor,
  type IColorManager,
  type ILch,
  type IOklcha,
  type IRangeColor,
  type IRangeLch,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  hMax,
  identity,
  lchToOklch,
  none,
  parseAlpha,
  percentDenominator,
} from "@tsparticles/engine";
import { lchToRgb, lchaToRgba } from "./utils.js";

const lchRegex =
    /^lch\(\s*((?:\d+(?:\.\d*)?|\.\d+))%?\s+((?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:deg|°|rad|grad|turn)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i,
  gradsPerTurn = 400,
  lchChromaPercentScale = 1.5;

function parseLchHue(input: string): number {
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

/** LCH color manager */
export class LchColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with lch
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return /^lch/i.test(input);
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      lchColor = colorValue.lch ?? (color.value as ILch);

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    return lchToRgb(lchColor); // Handle LCH conversion
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      lchColor = colorValue.lch ?? (color.value as ILch);

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    const alpha = (lchColor as ILch & { a?: number }).a ?? defaultAlpha;

    return { ...lchToOklch(lchColor), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      lchColor = colorValue.lch ?? (color.value as IRangeLch); // Support for LCH

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    return lchToRgb({
      l: getRangeValue(lchColor.l, this.#random),
      c: getRangeValue(lchColor.c, this.#random),
      h: getRangeValue(lchColor.h, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      lchColor = colorValue.lch ?? (color.value as IRangeLch);

    if (!("l" in lchColor) || !("c" in lchColor) || !("h" in lchColor)) {
      return;
    }

    const resolved = {
      l: getRangeValue(lchColor.l, this.#random),
      c: getRangeValue(lchColor.c, this.#random),
      h: getRangeValue(lchColor.h, this.#random),
    };

    return { ...lchToOklch(resolved), a: defaultAlpha };
  }

  /**
   * Parses an LCH color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = lchRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        c: 2,
        cPercent: 3,
        h: 4,
        a: 5, // Optional alpha for LCH
      };

    if (!result) {
      return;
    }

    const lch = {
        c:
          Number.parseFloat(result[indexes.c] ?? "0") *
          (result[indexes.cPercent] ? lchChromaPercentScale : 1),
        h: parseLchHue(result[indexes.h] ?? "0"),
        l: Number.parseFloat(result[indexes.l] ?? "0"),
      },
      alpha = result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha;

    if (
      ![lch.l, lch.c, lch.h, alpha].every(Number.isFinite) ||
      lch.l < none ||
      lch.l > percentDenominator ||
      lch.c < none ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return lchaToRgba({ ...lch, a: alpha });
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = lchRegex.exec(input);

    if (!result) {
      return;
    }

    const lch = {
        l: Number.parseFloat(result[1] ?? "0"),
        c:
          Number.parseFloat(result[2] ?? "0") *
          (result[3] ? lchChromaPercentScale : 1),
        h: parseLchHue(result[4] ?? "0"),
      },
      alpha = result[5] ? parseAlpha(result[5]) : defaultAlpha;

    if (
      ![lch.l, lch.c, lch.h, alpha].every(Number.isFinite) ||
      lch.l < none ||
      lch.l > percentDenominator ||
      lch.c < none ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return { ...lchToOklch(lch), a: alpha };
  }
}
