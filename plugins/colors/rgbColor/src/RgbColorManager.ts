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

const rgbRegex =
    /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i;

/**
 */
export class RgbColorManager implements IColorManager {
    readonly key;

    constructor() {
        this.key = "rgb";
    }

    accepts(input: string): boolean {
        return input.startsWith("rgb");
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
