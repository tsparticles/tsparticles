import type { IColor, IRangeColor, IRangeRgb, IRgb, IRgba, IValueColor } from "../Core/Interfaces/Colors";
import { getRangeValue, parseAlpha } from "./NumberUtils";
import type { IColorManager } from "../Core/Interfaces/IColorManager";

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

        if (rgbColor.r !== undefined) {
            return rgbColor;
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            rgbColor = colorValue.rgb ?? (color.value as IRangeRgb);

        if (rgbColor.r !== undefined) {
            return {
                r: getRangeValue(rgbColor.r),
                g: getRangeValue(rgbColor.g),
                b: getRangeValue(rgbColor.b),
            };
        }
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith(this.stringPrefix)) {
            return;
        }

        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i,
            result = regex.exec(input);

        return result
            ? {
                  a: result.length > 4 ? parseAlpha(result[5]) : 1,
                  b: parseInt(result[3], 10),
                  g: parseInt(result[2], 10),
                  r: parseInt(result[1], 10),
              }
            : undefined;
    }
}
