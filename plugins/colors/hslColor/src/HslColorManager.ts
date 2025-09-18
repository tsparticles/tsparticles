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

/**
 */
export class HslColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "hsl";
        this.stringPrefix = "hsl";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            hslColor = colorValue.hsl ?? (color.value as IHsl);

        if (!Object.hasOwn(hslColor, "h") && !Object.hasOwn(hslColor, "s") && !Object.hasOwn(hslColor, "l")) {
            return;
        }

        return hslToRgb(hslColor);
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            hslColor = colorValue.hsl ?? (color.value as IRangeHsl);

        if (!Object.hasOwn(hslColor, "h") && !Object.hasOwn(hslColor, "s") && !Object.hasOwn(hslColor, "l")) {
            return;
        }

        return hslToRgb({
            h: getRangeValue(hslColor.h),
            l: getRangeValue(hslColor.l),
            s: getRangeValue(hslColor.s),
        });
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith("hsl")) {
            return;
        }

        const regex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,
            result = regex.exec(input),
            minLength = 4,
            defaultAlpha = 1,
            radix = 10;

        return result
            ? hslaToRgba({
                  a: result.length > minLength ? parseAlpha(result[HslIndexes.a]) : defaultAlpha,
                  h: parseInt(result[HslIndexes.h], radix),
                  l: parseInt(result[HslIndexes.l], radix),
                  s: parseInt(result[HslIndexes.s], radix),
              })
            : undefined;
    }
}
