import type { IColor } from "../Core/Interfaces/IColor";
import type { IRgb } from "../Core/Interfaces/IRgb";
import type { IRgba } from "../Core/Interfaces/IRgba";
import type { IHsl } from "../Core/Interfaces/IHsl";
import type { IHsla } from "../Core/Interfaces/IHsla";
import { Utils } from "./Utils";
import { Constants } from "./Constants";
import type { IValueColor } from "../Core/Interfaces/IValueColor";
import { IImage } from "../Core/Interfaces/IImage";

export class ColorUtils {
    /**
     * Gets the particles color
     * @param input the input color to convert in [[IRgb]] object
     */
    public static colorToRgb(input?: string | IColor): IRgb | undefined {
        if (input === undefined) {
            return;
        }

        const color = typeof input === "string" ? { value: input } : input;

        let res: IRgb | undefined;

        if (typeof color.value === "string") {
            if (color.value === Constants.randomColorValue) {
                res = this.getRandomRgbColor();
            } else {
                res = ColorUtils.stringToRgb(color.value);
            }
        } else {
            if (color.value instanceof Array) {
                const colorSelected = Utils.itemFromArray(color.value);

                res = ColorUtils.colorToRgb({ value: colorSelected });
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

    /**
     * Gets the particles color
     * @param color the input color to convert in [[IHsl]] object
     */
    public static colorToHsl(color: string | IColor | undefined): IHsl | undefined {
        const rgb = this.colorToRgb(color);

        return rgb !== undefined ? this.rgbToHsl(rgb) : rgb;
    }

    public static rgbToHsl(color: IRgb): IHsl {
        const r1 = color.r / 255;
        const g1 = color.g / 255;
        const b1 = color.b / 255;

        const max = Math.max(r1, g1, b1);
        const min = Math.min(r1, g1, b1);

        //Calculate L:
        const res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };

        if (max != min) {
            //Calculate S:
            res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
            //Calculate H:
            res.h =
                r1 === max
                    ? (g1 - b1) / (max - min)
                    : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
        }

        res.l *= 100;
        res.s *= 100;
        res.h *= 60;

        if (res.h < 0) {
            res.h += 360;
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
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };

        if (hslPercent.s === 0) {
            result.b = hslPercent.l; // achromatic
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        } else {
            const q =
                hslPercent.l < 0.5
                    ? hslPercent.l * (1 + hslPercent.s)
                    : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
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
        };
    }

    /**
     * Generate a random Rgb color
     * @param min a minimum seed value for all 3 values
     */
    public static getRandomRgbColor(min?: number): IRgb {
        const fixedMin = min ?? 0;

        return {
            b: Math.floor(Utils.randomInRange(fixedMin, 256)),
            g: Math.floor(Utils.randomInRange(fixedMin, 256)),
            r: Math.floor(Utils.randomInRange(fixedMin, 256)),
        };
    }

    /**
     * Prepares a rgba() css function from a [[IRgb]] object
     * @param color the [[IRgb]] color to convert
     * @param opacity the opacity to apply to color
     */
    public static getStyleFromRgb(color: IRgb, opacity?: number): string {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? 1})`;
    }

    /**
     * Prepares a hsla() css function from a [[IHsl]] object
     * @param color the [[IHsl]] color to convert
     * @param opacity the opacity to apply to color
     */
    public static getStyleFromHsl(color: IHsl, opacity?: number): string {
        return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? 1})`;
    }

    public static mix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number): IRgb {
        let rgb1 = color1 as IRgb;
        let rgb2 = color2 as IRgb;

        if (rgb1.r === undefined) {
            rgb1 = this.hslToRgb(color1 as IHsl);
        }

        if (rgb2.r === undefined) {
            rgb2 = this.hslToRgb(color2 as IHsl);
        }

        return {
            b: Utils.mix(rgb1.b, rgb2.b, size1, size2),
            g: Utils.mix(rgb1.g, rgb2.g, size1, size2),
            r: Utils.mix(rgb1.r, rgb2.r, size1, size2),
        };
    }

    public static replaceColorSvg(image: IImage, color: IHsl, opacity: number): string {
        if (!image.svgData) {
            return "";
        }

        /* set color to svg element */
        const svgXml = image.svgData;
        const rgbHex = /#([0-9A-F]{3,6})/gi;

        return svgXml.replace(rgbHex, () => ColorUtils.getStyleFromHsl(color, opacity));
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
        if (input.startsWith("rgb")) {
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result
                ? {
                      a: result.length > 4 ? parseFloat(result[5]) : 1,
                      b: parseInt(result[3], 10),
                      g: parseInt(result[2], 10),
                      r: parseInt(result[1], 10),
                  }
                : undefined;
        } else if (input.startsWith("hsl")) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);

            return result
                ? ColorUtils.hslaToRgba({
                      a: result.length > 4 ? parseFloat(result[5]) : 1,
                      h: parseInt(result[1], 10),
                      l: parseInt(result[3], 10),
                      s: parseInt(result[2], 10),
                  })
                : undefined;
        } else {
            // By Tim Down - http://stackoverflow.com/a/5624139/3493650
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);

            return result
                ? {
                      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                      b: parseInt(result[3], 16),
                      g: parseInt(result[2], 16),
                      r: parseInt(result[1], 16),
                  }
                : undefined;
        }
    }
}
