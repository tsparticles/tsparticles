import type {
    IColor,
    IHsl,
    IRangeColor,
    IRangeHsl,
    IRangeValueColor,
    IRgb,
    IRgba,
    IValueColor,
} from "../Core/Interfaces/Colors.js";
import { getRangeValue, parseAlpha } from "./NumberUtils.js";
import { hslToRgb, hslaToRgba } from "./ColorUtils.js";
import type { IColorManager } from "../Core/Interfaces/IColorManager.js";

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

        if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
            return hslToRgb(hslColor);
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            hslColor = colorValue.hsl ?? (color.value as IRangeHsl);

        if (hslColor.h !== undefined && hslColor.l !== undefined) {
            return hslToRgb({
                h: getRangeValue(hslColor.h),
                l: getRangeValue(hslColor.l),
                s: getRangeValue(hslColor.s),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith("hsl")) {
            return;
        }

        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
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
