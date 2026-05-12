import {
  type IColor,
  type IColorManager,
  type IHsl,
  type IRangeColor,
  type IRangeHsl,
  type IRangeValueColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  getRangeValue,
  hslToRgb,
  hslaToRgba,
  parseAlpha,
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
  a = 5,
}

const hslRegex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;

/** HSL color manager */
export class HslColorManager implements IColorManager {
  /**
   * Checks if the input starts with hsl
   * @param input
   */
  accepts(input: string): boolean {
    return input.startsWith("hsl");
  }

  /**
   * Converts an IColor to RGB
   * @param color
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hslColor = colorValue.hsl ?? (color.value as IHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    return hslToRgb(hslColor);
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IRangeValueColor,
      hslColor = colorValue.hsl ?? (color.value as IRangeHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    return hslToRgb({
      h: getRangeValue(hslColor.h),
      l: getRangeValue(hslColor.l),
      s: getRangeValue(hslColor.s),
    });
  }

  /**
   * Parses an HSL color string to RGBA
   * @param input
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hslRegex.exec(input),
      minLength = 4,
      defaultAlpha = 1,
      radix = 10;

    return result
      ? hslaToRgba({
          a: result.length > minLength ? parseAlpha(result[HslIndexes.a]) : defaultAlpha,
          h: Number.parseInt(result[HslIndexes.h] ?? "0", radix),
          l: Number.parseInt(result[HslIndexes.l] ?? "0", radix),
          s: Number.parseInt(result[HslIndexes.s] ?? "0", radix),
        })
      : undefined;
  }
}
