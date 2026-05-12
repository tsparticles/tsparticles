import {
  type IColor,
  type IColorManager,
  type ILab,
  type IRangeColor,
  type IRangeLab,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  parseAlpha,
} from "@tsparticles/engine";
import { labToRgb, labaToRgba } from "./utils.js";

const labRegex = /lab\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

/** LAB color manager */
export class LabColorManager implements IColorManager {
  /**
   * Checks if the input starts with lab
   * @param input
   */
  accepts(input: string): boolean {
    return input.startsWith("lab");
  }

  /**
   * Converts an IColor to RGB
   * @param color
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      labColor = colorValue.lab ?? (color.value as ILab);

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    return labToRgb(labColor); // Handle LAB conversion
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      labColor = colorValue.lab ?? (color.value as IRangeLab); // Support for LAB

    if (!("l" in labColor) || !("aAxis" in labColor) || !("bAxis" in labColor)) {
      return;
    }

    return labToRgb({
      l: getRangeValue(labColor.l),
      aAxis: getRangeValue(labColor.aAxis),
      bAxis: getRangeValue(labColor.bAxis),
    });
  }

  /**
   * Parses a LAB color string to RGBA
   * @param input
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = labRegex.exec(input),
      indexes = {
        l: 1, // Lightness
        aAxis: 3, // Chroma
        bAxis: 5, // Hue
        a: 7, // Optional alpha for LAB
      },
      defaultAlpha = 1;

    return result
      ? labaToRgba({
          a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
          aAxis: parseFloat(result[indexes.aAxis] ?? "0"),
          bAxis: parseFloat(result[indexes.bAxis] ?? "0"),
          l: parseFloat(result[indexes.l] ?? "0"),
        })
      : undefined; // LAB parsing without alpha
  }
}
