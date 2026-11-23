import {
  type IColor,
  type IColorManager,
  type IOklab,
  type IOklcha,
  type IRangeColor,
  type IRangeOklab,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  double,
  getRangeValue,
  hMax,
  identity,
  none,
  parseAlpha,
  percentDenominator,
} from "@tsparticles/engine";
import { oklabToRgb, oklabaToRgba } from "./utils.js";

const oklabRegex =
    /^oklab\(\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i,
  achromaticThreshold = 1e-7,
  oklabAxisPercentScale = 0.004;

/** OKLAB color manager */
export class OklabColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with oklab
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.toLowerCase().startsWith("oklab");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IOklab);

    if (
      !("l" in oklabColor) ||
      !("aAxis" in oklabColor) ||
      !("bAxis" in oklabColor)
    ) {
      return;
    }

    return oklabToRgb(oklabColor);
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IOklab);

    if (
      !("l" in oklabColor) ||
      !("aAxis" in oklabColor) ||
      !("bAxis" in oklabColor)
    ) {
      return;
    }

    const aAxis = oklabColor.aAxis,
      bAxis = oklabColor.bAxis,
      chroma = Math.hypot(aAxis, bAxis),
      alpha = (oklabColor as IOklab & { a?: number }).a ?? defaultAlpha;

    if (
      ![oklabColor.l, aAxis, bAxis, chroma, alpha].every(Number.isFinite) ||
      alpha < none ||
      alpha > identity ||
      oklabColor.l < none ||
      oklabColor.l > percentDenominator
    ) {
      return;
    }

    return {
      a: alpha,
      c: chroma,
      h:
        chroma < achromaticThreshold
          ? 0
          : ((Math.atan2(bAxis, aAxis) * hMax) / (double * Math.PI) + hMax) %
            hMax,
      l: oklabColor.l,
    };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IRangeOklab);

    if (
      !("l" in oklabColor) ||
      !("aAxis" in oklabColor) ||
      !("bAxis" in oklabColor)
    ) {
      return;
    }

    return oklabToRgb({
      l: getRangeValue(oklabColor.l, this.#random),
      aAxis: getRangeValue(oklabColor.aAxis, this.#random),
      bAxis: getRangeValue(oklabColor.bAxis, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IRangeOklab);

    if (
      !("l" in oklabColor) ||
      !("aAxis" in oklabColor) ||
      !("bAxis" in oklabColor)
    ) {
      return;
    }

    const l = getRangeValue(oklabColor.l, this.#random),
      aAxis = getRangeValue(oklabColor.aAxis, this.#random),
      bAxis = getRangeValue(oklabColor.bAxis, this.#random),
      chroma = Math.hypot(aAxis, bAxis);

    if (
      ![l, aAxis, bAxis, chroma].every(Number.isFinite) ||
      l < none ||
      l > percentDenominator
    ) {
      return;
    }

    return {
      a: defaultAlpha,
      c: chroma,
      h:
        chroma < achromaticThreshold
          ? 0
          : ((Math.atan2(bAxis, aAxis) * hMax) / (double * Math.PI) + hMax) %
            hMax,
      l,
    };
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
        aAxisPercent: 4,
        bAxis: 5,
        bAxisPercent: 6,
        a: 7,
      };

    if (!result) {
      return undefined;
    }

    const rawL = Number.parseFloat(result[indexes.l] ?? "0");

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

    const alpha = result[indexes.a]
        ? parseAlpha(result[indexes.a])
        : defaultAlpha,
      aAxis =
        Number.parseFloat(result[indexes.aAxis] ?? "0") *
        (result[indexes.aAxisPercent] ? oklabAxisPercentScale : 1),
      bAxis =
        Number.parseFloat(result[indexes.bAxis] ?? "0") *
        (result[indexes.bAxisPercent] ? oklabAxisPercentScale : 1);

    if (
      ![alpha, aAxis, bAxis].every(Number.isFinite) ||
      alpha < none ||
      alpha > identity
    ) {
      return undefined;
    }

    return oklabaToRgba({
      a: alpha,
      l: rawL * (result[indexes.lPercent] ? identity : percentDenominator),
      aAxis,
      bAxis,
    });
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = oklabRegex.exec(input);

    if (!result) {
      return;
    }

    const rawL = Number.parseFloat(result[1] ?? "0"),
      lightness = rawL * (result[2] ? identity : percentDenominator),
      aAxis =
        Number.parseFloat(result[3] ?? "0") *
        (result[4] ? oklabAxisPercentScale : 1),
      bAxis =
        Number.parseFloat(result[5] ?? "0") *
        (result[6] ? oklabAxisPercentScale : 1),
      chroma = Math.hypot(aAxis, bAxis),
      alpha = result[7] ? parseAlpha(result[7]) : defaultAlpha;

    if (
      ![lightness, aAxis, bAxis, alpha].every(Number.isFinite) ||
      alpha < none ||
      alpha > identity ||
      (result[2]
        ? rawL < none || rawL > percentDenominator
        : rawL < none || rawL > identity)
    ) {
      return;
    }

    return {
      a: alpha,
      c: chroma,
      h:
        chroma < achromaticThreshold
          ? 0
          : ((Math.atan2(bAxis, aAxis) * hMax) / (double * Math.PI) + hMax) %
            hMax,
      l: lightness,
    };
  }
}
