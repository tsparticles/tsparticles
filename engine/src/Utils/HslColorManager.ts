import type { IColor, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors";
import { getRangeValue, parseAlpha } from "./NumberUtils";
import { hslToRgb, hslaToRgba } from "./ColorUtils";
import type { IColorManager } from "../Core/Interfaces/IColorManager";
import type { IHsl } from "../Core/Interfaces/Colors";
import type { IRangeHsl } from "../Core/Interfaces/Colors";
import type { IRangeValueColor } from "../Core/Interfaces/Colors";
import type { IValueColor } from "../Core/Interfaces/Colors";

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
            result = regex.exec(input);

        return result
            ? hslaToRgba({
                  a: result.length > 4 ? parseAlpha(result[5]) : 1,
                  h: parseInt(result[1], 10),
                  l: parseInt(result[3], 10),
                  s: parseInt(result[2], 10),
              })
            : undefined;
    }
}
