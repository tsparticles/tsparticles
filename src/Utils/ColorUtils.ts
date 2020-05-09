import type { IColor } from "../Core/Interfaces/IColor";
import type { IRgb } from "../Core/Interfaces/IRgb";
import type { IRgba } from "../Core/Interfaces/IRgba";
import type { IHsl } from "../Core/Interfaces/IHsl";
import type { IHsla } from "../Core/Interfaces/IHsla";
import { Utils } from "./Utils";
import { Constants } from "./Constants";
import type { IValueColor } from "../Core/Interfaces/IValueColor";

export class ColorUtils {
    /**
     * Gets the particles color
     * @param color the input color to convert in [[IRgb]] object
     */
    public static colorToRgb(color: IColor): IRgb | undefined {
        let res: IRgb | undefined;

        if (typeof (color.value) === "string") {
            if (color.value === Constants.randomColorValue) {
                res = {
                    b: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    r: Math.floor(Math.random() * 256),
                };
            } else {
                res = ColorUtils.stringToRgb(color.value);
            }
        } else {
            if (color.value instanceof Array) {
                const colorSelected = Utils.itemFromArray(color.value);

                res = ColorUtils.stringToRgb(colorSelected);
            } else {
                const colorValue = color.value as IValueColor;
                const rgbColor = colorValue.rgb ?? (color.value as IRgb);

                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                } else {
                    const hslColor = colorValue.hsl ?? (color.value as IHsl);

                    if (hslColor.h !== undefined) {
                        res = ColorUtils.hslToRgb(hslColor);
                    }
                }
            }
        }

        return res;
    }

    public static stringToAlpha(input: string): number | undefined {
        return ColorUtils.stringToRgba(input)?.a;
    }

    /**
     * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
     * @param input the hexadecimal string (#f70 or #ff7700)
     */
    public static stringToRgb(input: string): IRgb | undefined {
        return ColorUtils.stringToRgba(input);
    }

    /**
     * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
     * @param hsl
     */
    public static hslToRgb(hsl: IHsl): IRgb {
        const result: IRgb = { b: 0, g: 0, r: 0 };
        const hslPercent: IHsl = {
            h: hsl.h > 1 ? hsl.h / 360 : hsl.h,
            l: hsl.l > 1 ? hsl.l / 100 : hsl.l,
            s: hsl.s > 1 ? hsl.s / 100 : hsl.s,
        };

        if (hslPercent.s === 0) {
            result.b = hslPercent.l; // achromatic
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        } else {
            const q = hslPercent.l < 0.5 ?
                hslPercent.l * (1 + hslPercent.s) :
                hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
            const p = 2 * hslPercent.l - q;

            result.r = ColorUtils.hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = ColorUtils.hue2rgb(p, q, hslPercent.h);
            result.b = ColorUtils.hue2rgb(p, q, hslPercent.h - 1 / 3);
        }

        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);

        return result;
    }

    public static hslaToRgba(hsla: IHsla): IRgba {
        const rgbResult = ColorUtils.hslToRgb(hsla);

        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        }
    }

    /**
     * Generate a random Rgb color
     * @param min a minimum seed value for all 3 values
     */
    public static getRandomRgbColor(min?: number): IRgb {
        const fixedMin = min || 0;
        const minColor = fixedMin + (fixedMin * Math.pow(16, 2)) + (fixedMin * Math.pow(16, 4));
        const factor = minColor ^ 0xFFFFFF;
        const randomColor = Math.floor(((Math.random() * factor) | minColor)).toString(16);

        return this.stringToRgb(`#${randomColor}`) ?? {
            b: 0,
            g: 0,
            r: 0,
        };
    }

    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     * @param opacity the opacity to apply to color
     */
    public static getStyleFromColor(color: IRgb, opacity?: number): string {
        const opacityValue = opacity ?? 1;

        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityValue})`;
    }

    public static mix(color1: IRgb, color2: IRgb, size1: number, size2: number): IRgb {
        return {
            b: Utils.mix(color1.b, color2.b, size1, size2),
            g: Utils.mix(color1.g, color2.g, size1, size2),
            r: Utils.mix(color1.r, color2.r, size1, size2),
        };
    }

    /**
     *
     * @param p
     * @param q
     * @param t
     */
    private static hue2rgb(p: number, q: number, t: number): number {
        let tCalc = t;

        if (tCalc < 0) {
            tCalc += 1;
        }

        if (tCalc > 1) {
            tCalc -= 1;
        }

        if (tCalc < 1 / 6) {
            return p + (q - p) * 6 * tCalc;
        }

        if (tCalc < 1 / 2) {
            return q;
        }

        if (tCalc < 2 / 3) {
            return p + (q - p) * (2 / 3 - tCalc) * 6;
        }

        return p;
    }

    private static stringToRgba(input: string): IRgba | undefined {
        if (input.startsWith('rgb')) {
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result ? {
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                b: parseInt(result[3], 10),
                g: parseInt(result[2], 10),
                r: parseInt(result[1], 10),
            } : undefined;
        } else if (input.startsWith('hsl')) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result ? ColorUtils.hslaToRgba({
                a: result.length > 4 ? parseFloat(result[5]) : 1,
                h: parseInt(result[1], 10),
                l: parseInt(result[3], 10),
                s: parseInt(result[2], 10),
            }) : undefined;
        } else {
            // By Tim Down - http://stackoverflow.com/a/5624139/3493650
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);

            return result ? {
                a: result[4] !== undefined ? parseInt(result[4], 16) / 0xFF : 1,
                b: parseInt(result[3], 16),
                g: parseInt(result[2], 16),
                r: parseInt(result[1], 16),
            } : undefined;
        }
    }
}
