import type {
    IColor,
    IColorManager,
    IHsl,
    IHsla,
    IHsv,
    IHsva,
    IRangeColor,
    IRangeHsv,
    IRangeValueColor,
    IRgb,
    IRgba,
    IValueColor,
} from "tsparticles-engine";
import { getRangeValue, getStyleFromHsl, parseAlpha } from "tsparticles-engine";

/**
 * Converts a RGB ([[IRgb]]) object in a [[IHsv]] object
 * @param rgb the RGB ([[IRgb]]) object
 * @returns the [[IHsv]] object
 */
export function rgbToHsv(rgb: IRgb): IHsv {
    const rgbPercent = {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
        },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;

    let h = 0;

    if (v === rgbPercent.r) {
        h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
    } else if (v === rgbPercent.g) {
        h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
    } else if (v === rgbPercent.b) {
        h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
    }

    const s = !v ? 0 : c / v;

    return {
        h,
        s: s * 100,
        v: v * 100,
    };
}

/**
 * Converts a RGB ([[IRgba]]) object in a [[IHsva]] object
 * @param rgba the RGB ([[IRgba]]) object
 */
export function rgbaToHsva(rgba: IRgba): IHsva {
    return {
        a: rgba.a,
        ...rgbToHsv(rgba),
    };
}

/**
 * Gets a CSS style string from a [[IHsv]] object and opacity value
 * @param color the [[IHsv]] input color
 * @param opacity the opacity value
 * @returns the CSS style string
 */
export function getStyleFromHsv(color: IHsv, opacity?: number): string {
    return getStyleFromHsl(hsvToHsl(color), opacity);
}

/**
 * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IHsv]] object
 * @param hsl the Hue Saturation Lightness ([[IHsl]]) object
 * @returns the [[IHsv]] object
 */
export function hslToHsv(hsl: IHsl): IHsv {
    const l = hsl.l / 100,
        sl = hsl.s / 100,
        v = l + sl * Math.min(l, 1 - l),
        sv = !v ? 0 : 2 * (1 - l / v);

    return {
        h: hsl.h,
        s: sv * 100,
        v: v * 100,
    };
}

/**
 * Converts a Hue Saturation Lightness ([[IHsla]]) object in a [[IHsva]] object
 * @param hsla the Hue Saturation Lightness ([[IHsla]]) object
 * @returns the [[IHsva]] object
 */
export function hslaToHsva(hsla: IHsla): IHsva {
    return {
        a: hsla.a,
        ...hslToHsv(hsla),
    };
}

/**
 * Converts a Hue Saturation Lightness ([[IHsv]]) object in a [[IHsl]] object
 * @param hsv the Hue Saturation Lightness ([[IHsv]]) object
 * @returns the [[IHsl]] object
 */
export function hsvToHsl(hsv: IHsv): IHsl {
    const v = hsv.v / 100,
        sv = hsv.s / 100,
        l = v * (1 - sv / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return {
        h: hsv.h,
        l: l * 100,
        s: sl * 100,
    };
}

/**
 * Converts a Hue Saturation Lightness ([[IHsva]]) object in a [[IHsla]] object
 * @param hsva the Hue Saturation Lightness ([[IHsva]]) object
 * @returns the [[IHsla]] object
 */
export function hsvaToHsla(hsva: IHsva): IHsla {
    return {
        a: hsva.a,
        ...hsvToHsl(hsva),
    };
}

/**
 * Converts a Hue Saturation Lightness ([[IHsv]]) object in a [[IRgb]] object
 * @param hsv the Hue Saturation Lightness ([[IHsv]]) object
 * @returns the [[IRgb]] object
 */
export function hsvToRgb(hsv: IHsv): IRgb {
    const result: IRgb = { b: 0, g: 0, r: 0 },
        hsvPercent = {
            h: hsv.h / 60,
            s: hsv.s / 100,
            v: hsv.v / 100,
        },
        c = hsvPercent.v * hsvPercent.s,
        x = c * (1 - Math.abs((hsvPercent.h % 2) - 1));

    let tempRgb: IRgb | undefined;

    if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
        tempRgb = {
            r: c,
            g: x,
            b: 0,
        };
    } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
        tempRgb = {
            r: x,
            g: c,
            b: 0,
        };
    } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
        tempRgb = {
            r: 0,
            g: c,
            b: x,
        };
    } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
        tempRgb = {
            r: 0,
            g: x,
            b: c,
        };
    } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
        tempRgb = {
            r: x,
            g: 0,
            b: c,
        };
    } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
        tempRgb = {
            r: c,
            g: 0,
            b: x,
        };
    }

    if (tempRgb) {
        const m = hsvPercent.v - c;

        result.r = Math.floor((tempRgb.r + m) * 255);
        result.g = Math.floor((tempRgb.g + m) * 255);
        result.b = Math.floor((tempRgb.b + m) * 255);
    }

    return result;
}

/**
 * Converts a Hue Saturation Value ([[IHsva]]) object in a [[IRgba]] object
 * @param hsva the Hue Saturation Value ([[IHsva]]) object
 * @returns the [[IRgba]] object
 */
export function hsvaToRgba(hsva: IHsva): IRgba {
    return {
        a: hsva.a,
        ...hsvToRgb(hsva),
    };
}

export class HsvColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "hsv";
        this.stringPrefix = "hsv";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            hsvColor = colorValue.hsv ?? (color.value as IHsv);

        if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
            return hsvToRgb(hsvColor);
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            hsvColor = colorValue.hsv ?? (color.value as IRangeHsv);

        if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
            return hsvToRgb({
                h: getRangeValue(hsvColor.h),
                s: getRangeValue(hsvColor.s),
                v: getRangeValue(hsvColor.v),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith("hsv")) {
            return;
        }

        const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
            result = regex.exec(input);

        return result
            ? hsvaToRgba({
                  a: result.length > 4 ? parseAlpha(result[5]) : 1,
                  h: parseInt(result[1], 10),
                  s: parseInt(result[2], 10),
                  v: parseInt(result[3], 10),
              })
            : undefined;
    }
}
