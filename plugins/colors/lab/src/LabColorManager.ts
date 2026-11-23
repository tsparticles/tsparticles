import {
  type IColor,
  type IColorManager,
  type ILab,
  type IOklcha,
  type IRangeColor,
  type IRangeLab,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  identity,
  labToOklch,
  none,
  parseAlpha,
  percentDenominator,
} from "@tsparticles/engine";
import { labToRgb, labaToRgba } from "./utils.js";

const labRegex =
    /^lab\(\s*((?:\d+(?:\.\d*)?|\.\d+))%?\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+))(%?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i,
  labAxisPercentScale = 1.25;

/** LAB color manager */
export class LabColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number = Math.random) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with lab
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return /^lab/i.test(input);
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      labColor = colorValue.lab ?? (color.value as ILab);

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    return labToRgb(labColor); // Handle LAB conversion
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      labColor = colorValue.lab ?? (color.value as ILab);

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    const alpha = (labColor as ILab & { a?: number }).a ?? defaultAlpha;

    return { ...labToOklch(labColor), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      labColor = colorValue.lab ?? (color.value as IRangeLab); // Support for LAB

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    return labToRgb({
      l: getRangeValue(labColor.l, this.#random),
      aAxis: getRangeValue(labColor.aAxis, this.#random),
      bAxis: getRangeValue(labColor.bAxis, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IRangeValueColor,
      labColor = colorValue.lab ?? (color.value as IRangeLab);

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    const resolved = {
      l: getRangeValue(labColor.l, this.#random),
      aAxis: getRangeValue(labColor.aAxis, this.#random),
      bAxis: getRangeValue(labColor.bAxis, this.#random),
    };

    return { ...labToOklch(resolved), a: defaultAlpha };
  }

  /**
   * Parses a LAB color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = labRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        aAxis: 2,
        aAxisPercent: 3,
        bAxis: 4,
        bAxisPercent: 5,
        a: 6, // Optional alpha for LAB
      };

    if (!result) {
      return;
    }

    const color = {
        aAxis:
          Number.parseFloat(result[indexes.aAxis] ?? "0") * (result[indexes.aAxisPercent] ? labAxisPercentScale : 1),
        bAxis:
          Number.parseFloat(result[indexes.bAxis] ?? "0") * (result[indexes.bAxisPercent] ? labAxisPercentScale : 1),
        l: Number.parseFloat(result[indexes.l] ?? "0"),
      },
      alpha = result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha;

    if (
      ![color.l, color.aAxis, color.bAxis, alpha].every(Number.isFinite) ||
      color.l < none ||
      color.l > percentDenominator ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return labaToRgba({ ...color, a: alpha });
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = labRegex.exec(input);

    if (!result) {
      return;
    }

    const lab = {
        l: Number.parseFloat(result[1] ?? "0"),
        aAxis: Number.parseFloat(result[2] ?? "0") * (result[3] ? labAxisPercentScale : 1),
        bAxis: Number.parseFloat(result[4] ?? "0") * (result[5] ? labAxisPercentScale : 1),
      },
      alpha = result[6] ? parseAlpha(result[6]) : defaultAlpha;

    if (
      ![lab.l, lab.aAxis, lab.bAxis, alpha].every(Number.isFinite) ||
      lab.l < none ||
      lab.l > percentDenominator ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return { ...labToOklch(lab), a: alpha };
  }
}
