import {
    type IColor,
    type IColorManager,
    type ILch,
    type IRangeColor,
    type IRangeOklch,
    type IRangeValueColor,
    type IRgb,
    type IRgba,
    type IValueColor,
    getRangeValue,
    parseAlpha,
} from "@tsparticles/engine";
import { lchToRgb, lchaToRgba } from "./utils.js";

export class LchColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "lch";
        this.stringPrefix = "lch";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            lchColor = colorValue.lch ?? (color.value as ILch);

        if (!Object.hasOwn(lchColor, "l") && !Object.hasOwn(lchColor, "c") && !Object.hasOwn(lchColor, "h")) {
            return;
        }

        return lchToRgb(lchColor); // Handle LCH conversion
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            lchColor = colorValue.lch ?? (color.value as IRangeOklch); // Support for LCH

        if (!Object.hasOwn(lchColor, "l") && !Object.hasOwn(lchColor, "c") && !Object.hasOwn(lchColor, "h")) {
            return;
        }

        return lchToRgb({
            l: getRangeValue(lchColor.l),
            c: getRangeValue(lchColor.c),
            h: getRangeValue(lchColor.h),
        });
    }

    parseString(input: string): IRgba | undefined {
        const isLch = input.startsWith("lch");

        if (!isLch) {
            return;
        }

        // Adjust regex for both LCH and OKLCH
        const regex = /lch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i,
            result = regex.exec(input),
            indexes = {
                l: 1, // Lightness
                c: 3, // Chroma
                h: 5, // Hue
                a: 7, // Optional alpha for LCH
            },
            defaultAlpha = 1;

        return result
            ? lchaToRgba({
                  a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseFloat(result[indexes.c]),
                  h: parseFloat(result[indexes.h]),
                  l: parseFloat(result[indexes.l]),
              })
            : undefined; // LCH parsing without alpha
    }
}
