import { IColor } from "../../Interfaces/Options/Particles/IColor";
import { IRgb } from "../../Interfaces/IRgb";
import { IRgba } from "../../Interfaces/IRgba";
import { IHsl } from "../../Interfaces/IHsl";
import { IHsla } from "../../Interfaces/IHsla";
import { Utils } from "./Utils";

export class ColorUtils {
    /**
     * Gets the particles color
     * @param color the input color to convert in [[IRgb]] object
     */
    public static colorToRgb(color: IColor): IRgb | undefined {
        let res: IRgb | undefined;

        if (typeof (color.value) === "string") {
            if (color.value === "random") {
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
                const rgbColor = color.value as IRgb;

                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                }

                const hslColor = color.value as IHsl;

                if (hslColor.h !== undefined) {
                    res = ColorUtils.hslToRgb(hslColor);
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

        if (hsl.s === 0) {
            result.b = hsl.l; // achromatic
            result.g = hsl.l;
            result.r = hsl.l;
        } else {
            const q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
            const p = 2 * hsl.l - q;

            result.r = ColorUtils.hue2rgb(p, q, hsl.h + 1 / 3);
            result.g = ColorUtils.hue2rgb(p, q, hsl.h);
            result.b = ColorUtils.hue2rgb(p, q, hsl.h - 1 / 3);
        }

        result.r = Math.round(result.r * 255);
        result.g = Math.round(result.g * 255);
        result.b = Math.round(result.b * 255);

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
        const maxColor = minColor ^ 0xFFFFFF;
        const randomColor = (Math.random() * maxColor + minColor).toString(16);

        return this.stringToRgb(`#${randomColor}`) ?? {
            b: 0,
            g: 0,
            r: 0,
        };
    }

    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     */
    public static getStyleFromColor(color: IRgb, opacity?: number): string {
        const opacityValue = opacity ?? 0.4;

        return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${opacityValue})`;
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
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d\.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result ? {
                a: parseInt(result[4]),
                b: parseInt(result[3]),
                g: parseInt(result[2]),
                r: parseInt(result[1]),
            } : undefined;
        } else if (input.startsWith('hsl')) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([\d\.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result ? ColorUtils.hslaToRgba({
                a: parseInt(result[4]),
                h: parseInt(result[1]),
                l: parseInt(result[3]),
                s: parseInt(result[2]),
            }) : undefined;
        }
        else {
            // By Tim Down - http://stackoverflow.com/a/5624139/3493650
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);

            return result ? {
                a: parseInt(result[4], 16) / 0xFF,
                b: parseInt(result[3], 16),
                g: parseInt(result[2], 16),
                r: parseInt(result[1], 16),
            } : undefined;
        }
    }
}
