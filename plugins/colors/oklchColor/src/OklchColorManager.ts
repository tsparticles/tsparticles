import {
    type IColor,
    type IColorManager,
    type IOklch,
    type IRangeColor,
    type IRangeOklch,
    type IRangeValueColor,
    type IRgb,
    type IRgba,
    type IValueColor,
    getRangeValue,
    parseAlpha,
} from "@tsparticles/engine";
import { oklchToRgb, oklchaToRgba } from "./utils.js";

export class OklchColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "oklch";
        this.stringPrefix = "oklch";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            oklchColor = colorValue.oklch ?? (color.value as IOklch);

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb(oklchColor);
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            oklchColor = colorValue.oklch ?? (color.value as IRangeOklch);

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb({
                l: getRangeValue(oklchColor.l),
                c: getRangeValue(oklchColor.c),
                h: getRangeValue(oklchColor.h),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        const isOklch = input.startsWith("oklch");

        if (!isOklch) {
            return;
        }

        // Adjust regex for both LCH and OKLCH
        const regex =
                /oklch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(°)?(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i,
            result = regex.exec(input),
            indexes = {
                l: 1, // Lightness
                c: 3, // Chroma
                h: 5, // Hue
                a: 7, // Optional alpha for OKLCH
            },
            defaultAlpha = 1;

        return result
            ? oklchaToRgba({
                  a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseFloat(result[indexes.c]), // Chroma
                  h: parseFloat(result[indexes.h]), // Hue
                  l: parseFloat(result[indexes.l]), // Lightness
              })
            : undefined; // LCH parsing without alpha
    }
}
