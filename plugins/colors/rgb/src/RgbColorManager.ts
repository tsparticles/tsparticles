import {
  type IColor,
  type IColorManager,
  type IRangeColor,
  type IRangeRgb,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  parseAlpha,
} from "@tsparticles/engine";

/** Indexes for RGB regex capture groups */
enum RgbIndexes {
  /** Red component index */
  r = 1,
  /** Green component index */
  g = 2,
  /** Blue component index */
  b = 3,
  /** Alpha component index */
  a = 5,
}

const rgbRegex =
  /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;

/** RGB color manager */
export class RgbColorManager implements IColorManager {
  /**
   * Checks if the input starts with rgb
   * @param input
   */
  accepts(input: string): boolean {
    return input.startsWith("rgb");
  }

  /**
   * Converts an IColor to RGB
   * @param color
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    return rgbColor;
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      rgbColor = colorValue.rgb ?? (color.value as IRangeRgb);

    if (!("r" in rgbColor) || !("g" in rgbColor) || !("b" in rgbColor)) {
      return;
    }

    return {
      r: getRangeValue(rgbColor.r),
      g: getRangeValue(rgbColor.g),
      b: getRangeValue(rgbColor.b),
    };
  }

  /**
   * Parses an RGB color string to RGBA
   * @param input
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = rgbRegex.exec(input),
      radix = 10,
      minLength = 4,
      defaultAlpha = 1;

    return result
      ? {
          a: result.length > minLength ? parseAlpha(result[RgbIndexes.a]) : defaultAlpha,
          b: parseInt(result[RgbIndexes.b] ?? "0", radix),
          g: parseInt(result[RgbIndexes.g] ?? "0", radix),
          r: parseInt(result[RgbIndexes.r] ?? "0", radix),
        }
      : undefined;
  }
}
