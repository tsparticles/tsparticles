import {
    type IColor,
    type IColorManager,
    type IHsl,
    type IHsla,
    type IHsv,
    type IHsva,
    type IRangeColor,
    type IRangeHsv,
    type IRangeValueColor,
    type IRgb,
    type IRgba,
    type IValueColor,
    getRangeValue,
    getStyleFromHsl,
    parseAlpha,
    percentDenominator,
} from "@tsparticles/engine";

const rgbFactor = 255,
    double = 2,
    half = 0.5;

/**
 * Converts a RGB ({@link IRgb}) object in a {@link IHsv} object
 * @param rgb - the RGB ({@link IRgb}) object
 * @returns the {@link IHsv} object
 */
export function rgbToHsv(rgb: IRgb): IHsv {
    const rgbPercent = {
            r: rgb.r / rgbFactor,
            g: rgb.g / rgbFactor,
            b: rgb.b / rgbFactor,
        },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;

    let h = 0;

    const phaseOffset = {
            r: 0,
            g: 2,
            b: 4,
        },
        phaseValue = 60;

    if (v === rgbPercent.r) {
        h = phaseValue * (phaseOffset.r + (rgbPercent.g - rgbPercent.b) / c);
    } else if (v === rgbPercent.g) {
        h = phaseValue * (phaseOffset.g + (rgbPercent.b - rgbPercent.r) / c);
    } else if (v === rgbPercent.b) {
        h = phaseValue * (phaseOffset.b + (rgbPercent.r - rgbPercent.g) / c);
    }

    const defaultSaturation = 0,
        s = !v ? defaultSaturation : c / v;

    return {
        h,
        s: s * percentDenominator,
        v: v * percentDenominator,
    };
}

/**
 * Converts a RGB ({@link IRgba}) object in a {@link IHsva} object
 * @param rgba - the RGB ({@link IRgba}) object
 * @returns the {@link IHsva} object
 */
export function rgbaToHsva(rgba: IRgba): IHsva {
    return {
        a: rgba.a,
        ...rgbToHsv(rgba),
    };
}

/**
 * Gets a CSS style string from a {@link IHsv} object and opacity value
 * @param color - the {@link IHsv} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromHsv(color: IHsv, opacity?: number): string {
    return getStyleFromHsl(hsvToHsl(color), opacity);
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsl}) object in a {@link IHsv} object
 * @param hsl - the Hue Saturation Lightness ({@link IHsl}) object
 * @returns the {@link IHsv} object
 */
export function hslToHsv(hsl: IHsl): IHsv {
    const l = hsl.l / percentDenominator,
        sl = hsl.s / percentDenominator,
        offset = 1,
        noValue = 0,
        v = l + sl * Math.min(l, offset - l),
        sv = !v ? noValue : double * (offset - l / v);

    return {
        h: hsl.h,
        s: sv * percentDenominator,
        v: v * percentDenominator,
    };
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsla}) object in a {@link IHsva} object
 * @param hsla - the Hue Saturation Lightness ({@link IHsla}) object
 * @returns the {@link IHsva} object
 */
export function hslaToHsva(hsla: IHsla): IHsva {
    return {
        a: hsla.a,
        ...hslToHsv(hsla),
    };
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsv}) object in a {@link IHsl} object
 * @param hsv - the Hue Saturation Lightness ({@link IHsv}) object
 * @returns the {@link IHsl} object
 */
export function hsvToHsl(hsv: IHsv): IHsl {
    const v = hsv.v / percentDenominator,
        sv = hsv.s / percentDenominator,
        offset = 1,
        noValue = 0,
        l = v * (offset - sv * half),
        sl = !l || l === offset ? noValue : (v - l) / Math.min(l, offset - l);

    return {
        h: hsv.h,
        l: l * percentDenominator,
        s: sl * percentDenominator,
    };
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsva}) object in a {@link IHsla} object
 * @param hsva - the Hue Saturation Lightness ({@link IHsva}) object
 * @returns the {@link IHsla} object
 */
export function hsvaToHsla(hsva: IHsva): IHsla {
    return {
        a: hsva.a,
        ...hsvToHsl(hsva),
    };
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsv}) object in a {@link IRgb} object
 * @param hsv - the Hue Saturation Lightness ({@link IHsv}) object
 * @returns the {@link IRgb} object
 */
export function hsvToRgb(hsv: IHsv): IRgb {
    const result: IRgb = { b: 0, g: 0, r: 0 },
        phase = 60,
        hsvPercent = {
            h: hsv.h / phase,
            s: hsv.s / percentDenominator,
            v: hsv.v / percentDenominator,
        },
        offset = 1,
        hPercentFactor = 2,
        c = hsvPercent.v * hsvPercent.s,
        x = c * (offset - Math.abs((hsvPercent.h % hPercentFactor) - offset));

    let tempRgb: IRgb | undefined;

    const cxzRange = { min: 0, max: 1 },
        xczRange = { min: 1, max: 2 },
        zcxRange = { min: 2, max: 3 },
        zxcRange = { min: 3, max: 4 },
        xzcRange = { min: 4, max: 5 },
        czxRange = { min: 5, max: 6 };

    if (hsvPercent.h >= cxzRange.min && hsvPercent.h <= cxzRange.max) {
        tempRgb = {
            r: c,
            g: x,
            b: 0,
        };
    } else if (hsvPercent.h > xczRange.min && hsvPercent.h <= xczRange.max) {
        tempRgb = {
            r: x,
            g: c,
            b: 0,
        };
    } else if (hsvPercent.h > zcxRange.min && hsvPercent.h <= zcxRange.max) {
        tempRgb = {
            r: 0,
            g: c,
            b: x,
        };
    } else if (hsvPercent.h > zxcRange.min && hsvPercent.h <= zxcRange.max) {
        tempRgb = {
            r: 0,
            g: x,
            b: c,
        };
    } else if (hsvPercent.h > xzcRange.min && hsvPercent.h <= xzcRange.max) {
        tempRgb = {
            r: x,
            g: 0,
            b: c,
        };
    } else if (hsvPercent.h > czxRange.min && hsvPercent.h <= czxRange.max) {
        tempRgb = {
            r: c,
            g: 0,
            b: x,
        };
    }

    if (tempRgb) {
        const m = hsvPercent.v - c;

        result.r = Math.floor((tempRgb.r + m) * rgbFactor);
        result.g = Math.floor((tempRgb.g + m) * rgbFactor);
        result.b = Math.floor((tempRgb.b + m) * rgbFactor);
    }

    return result;
}

/**
 * Converts a Hue Saturation Value ({@link IHsva}) object in a {@link IRgba} object
 * @param hsva - the Hue Saturation Value ({@link IHsva}) object
 * @returns the {@link IRgba} object
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

        if (!Object.hasOwn(hsvColor, "h") && !Object.hasOwn(hsvColor, "v")) {
            return;
        }

        return hsvToRgb(hsvColor);
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            hsvColor = colorValue.hsv ?? (color.value as IRangeHsv);

        if (!Object.hasOwn(hsvColor, "h") && !Object.hasOwn(hsvColor, "v")) {
            return;
        }

        return hsvToRgb({
            h: getRangeValue(hsvColor.h),
            s: getRangeValue(hsvColor.s),
            v: getRangeValue(hsvColor.v),
        });
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith("hsv")) {
            return;
        }

        const regex = /hsva?\(\s*(\d+)°\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,
            result = regex.exec(input),
            fullLength = 4,
            indexes = {
                h: 1,
                s: 2,
                v: 3,
                a: 5,
            },
            defaultAlpha = 1,
            radix = 10;

        return result
            ? hsvaToRgba({
                  a: result.length > fullLength ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  h: parseInt(result[indexes.h], radix),
                  s: parseInt(result[indexes.s], radix),
                  v: parseInt(result[indexes.v], radix),
              })
            : undefined;
    }
}
