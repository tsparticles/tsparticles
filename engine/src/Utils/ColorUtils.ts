import type { IColor, IHsl, IHsla, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors.js";
import { getRandom, getRangeValue, mix, randomInRange, setRangeValue } from "./NumberUtils.js";
import { isArray, isString, itemFromArray } from "./Utils.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import type { HslAnimation } from "../Options/Classes/HslAnimation.js";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation.js";
import type { IColorManager } from "../Core/Interfaces/IColorManager.js";
import type { IOptionsColor } from "../Options/Interfaces/IOptionsColor.js";
import type { IParticle } from "../Core/Interfaces/IParticle.js";
import type { IParticleHslAnimation } from "../Core/Interfaces/IParticleHslAnimation.js";
import type { IParticleValueAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";

const randomColorValue = "random",
    midColorValue = "mid",
    colorManagers = new Map<string, IColorManager>();

/**
 * @param manager -
 */
export function addColorManager(manager: IColorManager): void {
    colorManagers.set(manager.key, manager);
}

/**
 * Converts hue to RGB values.
 * @param p -
 * @param q -
 * @param t -
 * @returns the hue calculated from the rgb values
 */
function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) {
        t += 1;
    }

    if (t > 1) {
        t -= 1;
    }

    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
        return q;
    }

    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
}

/**
 * Converts a string to a RGBA color.
 * @param input - A string that represents a color.
 * @returns the converted color from string to {@link IRgba} interfaec
 */
function stringToRgba(input: string): IRgba | undefined {
    for (const [, manager] of colorManagers) {
        if (input.startsWith(manager.stringPrefix)) {
            return manager.parseString(input);
        }
    }

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
        hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        }),
        regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
        result = regex.exec(hexFixed);

    return result
        ? {
              a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
              b: parseInt(result[3], 16),
              g: parseInt(result[2], 16),
              r: parseInt(result[1], 16),
          }
        : undefined;
}

/**
 * Gets the particles color
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false for ignoring the index parameter
 * @returns returns a RGB color in the given range
 */
export function rangeColorToRgb(input?: string | IRangeColor, index?: number, useIndex = true): IRgb | undefined {
    if (!input) {
        return;
    }

    const color = isString(input) ? { value: input } : input;

    if (isString(color.value)) {
        return colorToRgb(color.value, index, useIndex);
    }

    if (isArray(color.value)) {
        return rangeColorToRgb({
            value: itemFromArray(color.value, index, useIndex),
        });
    }

    for (const [, manager] of colorManagers) {
        const res = manager.handleRangeColor(color);

        if (res) {
            return res;
        }
    }
}

/**
 * Gets the particles color
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns returns an RGB color taken from a {@link IColor} object
 */
export function colorToRgb(input?: string | IColor, index?: number, useIndex = true): IRgb | undefined {
    if (!input) {
        return;
    }

    const color = isString(input) ? { value: input } : input;

    if (isString(color.value)) {
        return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
    }

    if (isArray(color.value)) {
        return colorToRgb({
            value: itemFromArray(color.value, index, useIndex),
        });
    }

    for (const [, manager] of colorManagers) {
        const res = manager.handleColor(color);

        if (res) {
            return res;
        }
    }
}

/**
 * Gets the particles color
 * @param color - the input color to convert in {@link IHsl} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns the {@link IHsl} object
 */
export function colorToHsl(color: string | IColor | undefined, index?: number, useIndex = true): IHsl | undefined {
    const rgb = colorToRgb(color, index, useIndex);

    return rgb ? rgbToHsl(rgb) : undefined;
}

/**
 * Gets the particles color
 * @param color - the input color to convert in {@link IHsl} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns the {@link IHsl} object
 */
export function rangeColorToHsl(
    color: string | IRangeColor | undefined,
    index?: number,
    useIndex = true,
): IHsl | undefined {
    const rgb = rangeColorToRgb(color, index, useIndex);

    return rgb ? rgbToHsl(rgb) : undefined;
}

/**
 * Converts rgb color to hsl color
 * @param color - rgb color to convert
 * @returns hsl color
 */
export function rgbToHsl(color: IRgb): IHsl {
    const r1 = color.r / 255,
        g1 = color.g / 255,
        b1 = color.b / 255,
        max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1),
        //Calculate L:
        res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };

    if (max !== min) {
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

    if (res.h >= 360) {
        res.h -= 360;
    }

    return res;
}

/**
 * Gets alpha value from string color
 * @param input - the input color to convert in alpha value
 * @returns the alpha value
 */
export function stringToAlpha(input: string): number | undefined {
    return stringToRgba(input)?.a;
}

/**
 * Converts hexadecimal string (HTML color code) in a {@link IRgb} object
 * @param input - the hexadecimal string (#f70 or #ff7700)
 * @returns the {@link IRgb} object
 */
export function stringToRgb(input: string): IRgb | undefined {
    return stringToRgba(input);
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsl}) object in a {@link IRgb} object
 * @param hsl - the Hue Saturation Lightness ({@link IHsl}) object
 * @returns the {@link IRgb} object
 */
export function hslToRgb(hsl: IHsl): IRgb {
    const result: IRgb = { b: 0, g: 0, r: 0 },
        hslPercent: IHsl = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };

    if (!hslPercent.s) {
        result.r = result.g = result.b = hslPercent.l; // achromatic
    } else {
        const q =
                hslPercent.l < 0.5
                    ? hslPercent.l * (1 + hslPercent.s)
                    : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s,
            p = 2 * hslPercent.l - q;

        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
    }

    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);

    return result;
}

/**
 * Converts HSLA color to RGBA color
 * @param hsla - the HSLA color to convert
 * @returns the RGBA color
 */
export function hslaToRgba(hsla: IHsla): IRgba {
    const rgbResult = hslToRgb(hsla);

    return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r,
    };
}

/**
 * Returns a random ({@link IRgb}) color
 * @param min - the minimum value for the color
 * @returns the random ({@link IRgb}) color
 */
export function getRandomRgbColor(min?: number): IRgb {
    const fixedMin = min ?? 0;

    return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    };
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromRgb(color: IRgb, opacity?: number): string {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? 1})`;
}

/**
 * Gets a CSS style string from a {@link IHsl} object and opacity value
 * @param color - the {@link IHsl} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromHsl(color: IHsl, opacity?: number): string {
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? 1})`;
}

/**
 * @param color1 -
 * @param color2 -
 * @param size1 -
 * @param size2 -
 * @returns the return value is a color mix between the two parameters, using sizes to mix more the biggest value
 */
export function colorMix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number): IRgb {
    let rgb1 = color1 as IRgb,
        rgb2 = color2 as IRgb;

    if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1 as IHsl);
    }

    if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2 as IHsl);
    }

    return {
        b: mix(rgb1.b, rgb2.b, size1, size2),
        g: mix(rgb1.g, rgb2.g, size1, size2),
        r: mix(rgb1.r, rgb2.r, size1, size2),
    };
}

/**
 * @param p1 -
 * @param p2 -
 * @param linkColor -
 * @returns the link color calculated using the two linked particles
 */
export function getLinkColor(p1: IParticle, p2?: IParticle, linkColor?: string | IRgb): IRgb | undefined {
    if (linkColor === randomColorValue) {
        return getRandomRgbColor();
    } else if (linkColor === midColorValue) {
        const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),
            destColor = p2?.getFillColor() ?? p2?.getStrokeColor();

        if (sourceColor && destColor && p2) {
            return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
        } else {
            const hslColor = sourceColor ?? destColor;

            if (hslColor) {
                return hslToRgb(hslColor);
            }
        }
    } else {
        return linkColor as IRgb;
    }
}

/**
 * @param optColor -
 * @param blink -
 * @param consent -
 * @returns returns a link random color, if needed
 */
export function getLinkRandomColor(
    optColor: string | IOptionsColor,
    blink: boolean,
    consent: boolean,
): IRgb | string | undefined {
    const color = isString(optColor) ? optColor : optColor.value;

    if (color === randomColorValue) {
        if (consent) {
            return rangeColorToRgb({
                value: color,
            });
        }

        if (blink) {
            return randomColorValue;
        }

        return midColorValue;
    } else if (color === midColorValue) {
        return midColorValue;
    } else {
        return rangeColorToRgb({
            value: color,
        });
    }
}

/**
 * @param animation -
 * @returns returns an animatable HSL color, if needed
 */
export function getHslFromAnimation(animation?: IParticleHslAnimation): IHsl | undefined {
    return animation !== undefined
        ? {
              h: animation.h.value,
              s: animation.s.value,
              l: animation.l.value,
          }
        : undefined;
}

/**
 * @param hsl -
 * @param animationOptions -
 * @param reduceFactor -
 * @returns returns the particle HSL animation values
 */
export function getHslAnimationFromHsl(
    hsl: IHsl,
    animationOptions: HslAnimation | undefined,
    reduceFactor: number,
): IParticleHslAnimation {
    /* color */
    const resColor: IParticleHslAnimation = {
        h: {
            enable: false,
            value: hsl.h,
        },
        s: {
            enable: false,
            value: hsl.s,
        },
        l: {
            enable: false,
            value: hsl.l,
        },
    };

    if (animationOptions) {
        setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
        setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
        setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
    }

    return resColor;
}

/**
 * @param colorValue -
 * @param colorAnimation -
 * @param reduceFactor -
 */
function setColorAnimation(
    colorValue: IParticleValueAnimation<number>,
    colorAnimation: IColorAnimation,
    reduceFactor: number,
): void {
    colorValue.enable = colorAnimation.enable;

    if (colorValue.enable) {
        colorValue.velocity = (getRangeValue(colorAnimation.speed) / 100) * reduceFactor;
        colorValue.decay = 1 - getRangeValue(colorAnimation.decay);
        colorValue.status = AnimationStatus.increasing;
        colorValue.loops = 0;
        colorValue.maxLoops = getRangeValue(colorAnimation.count);
        colorValue.time = 0;
        colorValue.delayTime = getRangeValue(colorAnimation.delay) * 1000;

        if (!colorAnimation.sync) {
            colorValue.velocity *= getRandom();
            colorValue.value *= getRandom();
        }

        colorValue.initialValue = colorValue.value;
    } else {
        colorValue.velocity = 0;
    }
}
