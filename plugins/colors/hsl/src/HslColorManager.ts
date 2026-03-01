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

enum HslIndexes {
  h = 1,
  s = 2,
  l = 3,
  a = 5,
}

const hslRegex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;

/**
 */
export class HslColorManager implements IColorManager {
  accepts(input: string): boolean {
    return input.startsWith("hsl");
  }

  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hslColor = colorValue.hsl ?? (color.value as IHsl);

    if (!("h" in hslColor) || !("s" in hslColor) || !("l" in hslColor)) {
      return;
    }

    return hslToRgb(hslColor);
  }

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
