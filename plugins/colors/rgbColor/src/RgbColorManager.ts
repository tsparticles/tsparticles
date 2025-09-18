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

enum RgbIndexes {
    r = 1,
    g = 2,
    b = 3,
    a = 5,
}

/**
 */
export class RgbColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "rgb";
        this.stringPrefix = "rgb";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            rgbColor = colorValue.rgb ?? (color.value as IRgb);

        if (!Object.hasOwn(rgbColor, "r")) {
            return;
        }

        return rgbColor;
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            rgbColor = colorValue.rgb ?? (color.value as IRangeRgb);

        if (!Object.hasOwn(rgbColor, "r")) {
            return;
        }

        return {
            r: getRangeValue(rgbColor.r),
            g: getRangeValue(rgbColor.g),
            b: getRangeValue(rgbColor.b),
        };
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith(this.stringPrefix)) {
            return;
        }

        const regex =
                /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,
            result = regex.exec(input),
            radix = 10,
            minLength = 4,
            defaultAlpha = 1;

        return result
            ? {
                  a: result.length > minLength ? parseAlpha(result[RgbIndexes.a]) : defaultAlpha,
                  b: parseInt(result[RgbIndexes.b], radix),
                  g: parseInt(result[RgbIndexes.g], radix),
                  r: parseInt(result[RgbIndexes.r], radix),
              }
            : undefined;
    }
}
