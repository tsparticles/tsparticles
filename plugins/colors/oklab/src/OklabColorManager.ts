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
  parseAlpha,
} from "@tsparticles/engine";
import { oklabToRgb, oklabaToRgba } from "./utils.js";

const oklabRegex =
  /oklab\(\s*(\d+(\.\d+)?)%\s+(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

export class OklabColorManager implements IColorManager {
  accepts(input: string): boolean {
    return input.startsWith("oklab");
  }

  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IOklab);

    if (!Object.hasOwn(oklabColor, "l") || !Object.hasOwn(oklabColor, "aAxis") || !Object.hasOwn(oklabColor, "bAxis")) {
      return;
    }

    return oklabToRgb(oklabColor);
  }

  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      oklabColor = colorValue.oklab ?? (color.value as IRangeOklab);

    if (!Object.hasOwn(oklabColor, "l") || !Object.hasOwn(oklabColor, "aAxis") || !Object.hasOwn(oklabColor, "bAxis")) {
      return;
    }

    return oklabToRgb({
      l: getRangeValue(oklabColor.l),
      aAxis: getRangeValue(oklabColor.aAxis),
      bAxis: getRangeValue(oklabColor.bAxis),
    });
  }

  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = oklabRegex.exec(input),
      indexes = {
        l: 1,
        aAxis: 3,
        bAxis: 5,
        a: 7,
      },
      defaultAlpha = 1;

    return result
      ? oklabaToRgba({
          a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
          l: parseFloat(result[indexes.l] ?? "0"),
          aAxis: parseFloat(result[indexes.aAxis] ?? "0"),
          bAxis: parseFloat(result[indexes.bAxis] ?? "0"),
        })
      : undefined;
  }
}
