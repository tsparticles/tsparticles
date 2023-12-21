import type { IColor, IHsl, IHsla, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors.js";
import { getRandom, getRangeValue, mix, randomInRange, setRangeValue } from "./NumberUtils.js";
import { isArray, isString, itemFromArray } from "./Utils.js";
import { millisecondsToSeconds, percentDenominator } from "../Core/Utils/Constants.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import type { HslAnimation } from "../Options/Classes/HslAnimation.js";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation.js";
import type { IColorManager } from "../Core/Interfaces/IColorManager.js";
import type { IOptionsColor } from "../Options/Interfaces/IOptionsColor.js";
import type { IParticleHslAnimation } from "../Core/Interfaces/IParticleHslAnimation.js";
import type { IParticleValueAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";
import type { Particle } from "../Core/Particle.js";

const enum RgbIndexes {
    r = 1,
    g = 2,
    b = 3,
    a = 4,
}

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
        hexFixed = input.replace(shorthandRegex, (_, r: string, g: string, b: string, a: string) => {
            return r + r + g + g + b + b + (a !== undefined ? a + a : "");
        }),
        regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
        result = regex.exec(hexFixed),
        radix = 16,
        defaultAlpha = 1,
        alphaFactor = 0xff;

    return result
        ? {
              a:
                  result[RgbIndexes.a] !== undefined
                      ? parseInt(result[RgbIndexes.a], radix) / alphaFactor
                      : defaultAlpha,
              b: parseInt(result[RgbIndexes.b], radix),
              g: parseInt(result[RgbIndexes.g], radix),
              r: parseInt(result[RgbIndexes.r], radix),
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
    const rgbMax = 255,
        hMax = 360,
        sMax = 100,
        lMax = 100,
        hMin = 0,
        sMin = 0,
        hPhase = 60,
        half = 0.5,
        double = 2,
        r1 = color.r / rgbMax,
        g1 = color.g / rgbMax,
        b1 = color.b / rgbMax,
        max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1),
        // Calculate L:
        res = {
            h: hMin,
            l: (max + min) * half,
            s: sMin,
        };

    if (max !== min) {
        // Calculate S:
        res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);
        // Calculate H:
        res.h =
            r1 === max
                ? (g1 - b1) / (max - min)
                : (res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min));
    }

    res.l *= lMax;
    res.s *= sMax;
    res.h *= hPhase;

    if (res.h < hMin) {
        res.h += hMax;
    }

    if (res.h >= hMax) {
        res.h -= hMax;
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
    // Ensure that h, s, and l are in the valid range
    const hMax = 360,
        sMax = 100,
        lMax = 100,
        sMin = 0,
        lMin = 0,
        h = ((hsl.h % hMax) + hMax) % hMax,
        s = Math.max(sMin, Math.min(sMax, hsl.s)),
        l = Math.max(lMin, Math.min(lMax, hsl.l)),
        // Convert h, s, and l to the range [0, 1]
        hNormalized = h / hMax,
        sNormalized = s / sMax,
        lNormalized = l / lMax,
        rgbFactor = 255,
        triple = 3;

    if (s === sMin) {
        // If saturation is 0, the color is grayscale
        const grayscaleValue = Math.round(lNormalized * rgbFactor);
        return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
    }

    const half = 0.5,
        double = 2,
        channel = (temp1: number, temp2: number, temp3: number): number => {
            const temp3Min = 0,
                temp3Max = 1,
                sextuple = 6;

            if (temp3 < temp3Min) {
                temp3++;
            }

            if (temp3 > temp3Max) {
                temp3--;
            }

            if (temp3 * sextuple < temp3Max) {
                return temp1 + (temp2 - temp1) * sextuple * temp3;
            }

            if (temp3 * double < temp3Max) {
                return temp2;
            }

            if (temp3 * triple < temp3Max * double) {
                const temp3Offset = double / triple;

                return temp1 + (temp2 - temp1) * (temp3Offset - temp3) * sextuple;
            }

            return temp1;
        },
        sNormalizedOffset = 1,
        temp1 =
            lNormalized < half
                ? lNormalized * (sNormalizedOffset + sNormalized)
                : lNormalized + sNormalized - lNormalized * sNormalized,
        temp2 = double * lNormalized - temp1,
        phaseNumerator = 1,
        phaseThird = phaseNumerator / triple,
        red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)),
        green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)),
        blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));

    return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
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
    const defaultMin = 0,
        fixedMin = min ?? defaultMin,
        rgbMax = 256;

    return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
    };
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromRgb(color: IRgb, opacity?: number): string {
    const defaultOpacity = 1;

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;
}

/**
 * Gets a CSS style string from a {@link IHsl} object and opacity value
 * @param color - the {@link IHsl} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromHsl(color: IHsl, opacity?: number): string {
    const defaultOpacity = 1;

    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;
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
export function getLinkColor(p1: Particle, p2?: Particle, linkColor?: string | IRgb): IRgb | undefined {
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

    const defaultVelocity = 0,
        decayOffset = 1,
        defaultLoops = 0,
        defaultTime = 0;

    if (colorValue.enable) {
        colorValue.velocity = (getRangeValue(colorAnimation.speed) / percentDenominator) * reduceFactor;
        colorValue.decay = decayOffset - getRangeValue(colorAnimation.decay);
        colorValue.status = AnimationStatus.increasing;
        colorValue.loops = defaultLoops;
        colorValue.maxLoops = getRangeValue(colorAnimation.count);
        colorValue.time = defaultTime;
        colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;

        if (!colorAnimation.sync) {
            colorValue.velocity *= getRandom();
            colorValue.value *= getRandom();
        }

        colorValue.initialValue = colorValue.value;
    } else {
        colorValue.velocity = defaultVelocity;
    }
}
