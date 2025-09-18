import type { IColor, IHsl, IHsla, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors.js";
import {
    clamp,
    getRandom,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    mix,
    randomInRange,
    setRangeValue,
} from "./NumberUtils.js";
import {
    decayOffset,
    defaultLoops,
    defaultOpacity,
    defaultRgbMin,
    defaultTime,
    defaultVelocity,
    double,
    hMax,
    hMin,
    hPhase,
    half,
    identity,
    lMax,
    lMin,
    midColorValue,
    millisecondsToSeconds,
    percentDenominator,
    phaseNumerator,
    randomColorValue,
    rgbFactor,
    rgbMax,
    sMax,
    sMin,
    sNormalizedOffset,
    sextuple,
    triple,
} from "../Core/Utils/Constants.js";
import { isArray, isString } from "./TypeUtils.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import type { Engine } from "../Core/Engine.js";
import type { HslAnimation } from "../Options/Classes/HslAnimation.js";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IOptionsColor } from "../Options/Interfaces/IOptionsColor.js";
import type { IParticleColorAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";
import type { IParticleHslAnimation } from "../Core/Interfaces/IParticleHslAnimation.js";
import type { IRangeValue } from "../Core/Interfaces/IRangeValue.js";
import type { Particle } from "../Core/Particle.js";
import { itemFromArray } from "./Utils.js";

/**
 * Converts a string to a RGBA color.
 * @param engine - The engine managing the current parameters.
 * @param input - A string that represents a color.
 * @returns the converted color from string to {@link IRgba} interfaec
 */
function stringToRgba(engine: Engine, input: string): IRgba | undefined {
    if (!input) {
        return;
    }

    for (const manager of engine.colorManagers.values()) {
        if (input.startsWith(manager.stringPrefix)) {
            return manager.parseString(input);
        }
    }
}

/**
 * Gets the particles color
 * @param engine - the engine managing the current parameters
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false for ignoring the index parameter
 * @returns returns a RGB color in the given range
 */
export function rangeColorToRgb(
    engine: Engine,
    input?: string | IRangeColor,
    index?: number,
    useIndex = true,
): IRgb | undefined {
    if (!input) {
        return;
    }

    const color = isString(input) ? { value: input } : input;

    if (isString(color.value)) {
        return colorToRgb(engine, color.value, index, useIndex);
    }

    if (isArray(color.value)) {
        return rangeColorToRgb(engine, {
            value: itemFromArray(color.value, index, useIndex),
        });
    }

    for (const manager of engine.colorManagers.values()) {
        const res = manager.handleRangeColor(color);

        if (res) {
            return res;
        }
    }
}

/**
 * Gets the particles color
 * @param engine - the engine managing the current parameters
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns returns an RGB color taken from a {@link IColor} object
 */
export function colorToRgb(engine: Engine, input?: string | IColor, index?: number, useIndex = true): IRgb | undefined {
    if (!input) {
        return;
    }

    const color = isString(input) ? { value: input } : input;

    if (isString(color.value)) {
        return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(engine, color.value);
    }

    if (isArray(color.value)) {
        return colorToRgb(engine, {
            value: itemFromArray(color.value, index, useIndex),
        });
    }

    for (const manager of engine.colorManagers.values()) {
        const res = manager.handleColor(color);

        if (res) {
            return res;
        }
    }
}

/**
 * Gets the particles color
 * @param engine - the engine managing the current parameters
 * @param color - the input color to convert in {@link IHsl} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns the {@link IHsl} object
 */
export function colorToHsl(
    engine: Engine,
    color: string | IColor | undefined,
    index?: number,
    useIndex = true,
): IHsl | undefined {
    const rgb = colorToRgb(engine, color, index, useIndex);

    return rgb ? rgbToHsl(rgb) : undefined;
}

/**
 * Gets the particles color
 * @param engine - the engine managing the current parameters
 * @param color - the input color to convert in {@link IHsl} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns the {@link IHsl} object
 */
export function rangeColorToHsl(
    engine: Engine,
    color: string | IRangeColor | undefined,
    index?: number,
    useIndex = true,
): IHsl | undefined {
    const rgb = rangeColorToRgb(engine, color, index, useIndex);

    return rgb ? rgbToHsl(rgb) : undefined;
}

/**
 * Converts rgb color to hsl color
 * @param color - rgb color to convert
 * @returns hsl color
 */
export function rgbToHsl(color: IRgb): IHsl {
    const r1 = color.r / rgbMax,
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
 * @param engine - the engine managing the current parameters
 * @param input - the input color to convert in alpha value
 * @returns the alpha value
 */
export function stringToAlpha(engine: Engine, input: string): number | undefined {
    return stringToRgba(engine, input)?.a;
}

/**
 * Converts hexadecimal string (HTML color code) in a {@link IRgb} object
 * @param engine - the engine managing the current parameters
 * @param input - the hexadecimal string (#f70 or #ff7700)
 * @returns the {@link IRgb} object
 */
export function stringToRgb(engine: Engine, input: string): IRgb | undefined {
    return stringToRgba(engine, input);
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsl}) object in a {@link IRgb} object
 * @param hsl - the Hue Saturation Lightness ({@link IHsl}) object
 * @returns the {@link IRgb} object
 */
export function hslToRgb(hsl: IHsl): IRgb {
    // Ensure that h, s, and l are in the valid range
    const h = ((hsl.h % hMax) + hMax) % hMax,
        s = Math.max(sMin, Math.min(sMax, hsl.s)),
        l = Math.max(lMin, Math.min(lMax, hsl.l)),
        // Convert h, s, and l to the range [0, 1]
        hNormalized = h / hMax,
        sNormalized = s / sMax,
        lNormalized = l / lMax;

    if (s === sMin) {
        // If saturation is 0, the color is grayscale
        const grayscaleValue = Math.round(lNormalized * rgbFactor);
        return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
    }

    const channel = (temp1: number, temp2: number, temp3: number): number => {
            const temp3Min = 0,
                temp3Max = 1;

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
        temp1 =
            lNormalized < half
                ? lNormalized * (sNormalizedOffset + sNormalized)
                : lNormalized + sNormalized - lNormalized * sNormalized,
        temp2 = double * lNormalized - temp1,
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
    const fixedMin = min ?? defaultRgbMin,
        fixedMax = rgbMax + identity;

    return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
    };
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromRgb(color: IRgb, opacity?: number): string {
    return `rgba(${color.r.toString()}, ${color.g.toString()}, ${color.b.toString()}, ${(opacity ?? defaultOpacity).toString()})`;
}

/**
 * Gets a CSS style string from a {@link IHsl} object and opacity value
 * @param color - the {@link IHsl} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromHsl(color: IHsl, opacity?: number): string {
    return `hsla(${color.h.toString()}, ${color.s.toString()}%, ${color.l.toString()}%, ${(opacity ?? defaultOpacity).toString()})`;
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

    if (!Object.hasOwn(rgb1, "r")) {
        rgb1 = hslToRgb(color1 as IHsl);
    }

    if (!Object.hasOwn(rgb2, "r")) {
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
 * @param engine -
 * @param optColor -
 * @param blink -
 * @param consent -
 * @returns returns a link random color, if needed
 */
export function getLinkRandomColor(
    engine: Engine,
    optColor: string | IOptionsColor,
    blink: boolean,
    consent: boolean,
): IRgb | string | undefined {
    const color = isString(optColor) ? optColor : optColor.value;

    if (color === randomColorValue) {
        if (consent) {
            return rangeColorToRgb(engine, {
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
        return rangeColorToRgb(engine, {
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
    colorValue: IParticleColorAnimation,
    colorAnimation: IColorAnimation,
    reduceFactor: number,
): void {
    colorValue.enable = colorAnimation.enable;

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
        colorValue.offset = setRangeValue(colorAnimation.offset);
    } else {
        colorValue.velocity = defaultVelocity;
    }
}

/**
 * @param data -
 * @param range -
 * @param decrease -
 * @param delta -
 */
export function updateColorValue(
    data: IParticleColorAnimation,
    range: IRangeValue,
    decrease: boolean,
    delta: IDelta,
): void {
    const minLoops = 0,
        minDelay = 0,
        identity = 1,
        minVelocity = 0,
        minOffset = 0,
        velocityFactor = 3.6;

    if (
        !data.enable ||
        ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))
    ) {
        return;
    }

    data.time ??= 0;

    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        data.time += delta.value;
    }

    if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
        return;
    }

    const offset = data.offset ? randomInRange(data.offset) : minOffset,
        velocity = (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor,
        decay = data.decay ?? identity,
        max = getRangeMax(range),
        min = getRangeMin(range);

    if (!decrease || data.status === AnimationStatus.increasing) {
        data.value += velocity;

        if (data.value > max) {
            data.loops ??= 0;
            data.loops++;

            if (decrease) {
                data.status = AnimationStatus.decreasing;
            } else {
                data.value -= max;
            }
        }
    } else {
        data.value -= velocity;

        const minValue = 0;

        if (data.value < minValue) {
            data.loops ??= 0;
            data.loops++;

            data.status = AnimationStatus.increasing;
        }
    }

    if (data.velocity && decay !== identity) {
        data.velocity *= decay;
    }

    data.value = clamp(data.value, min, max);
}

/**
 * @param color -
 * @param delta -
 */
export function updateColor(color: IParticleHslAnimation | undefined, delta: IDelta): void {
    if (!color) {
        return;
    }

    const { h, s, l } = color,
        ranges = {
            h: { min: 0, max: 360 },
            s: { min: 0, max: 100 },
            l: { min: 0, max: 100 },
        };

    updateColorValue(h, ranges.h, false, delta);
    updateColorValue(s, ranges.s, true, delta);
    updateColorValue(l, ranges.l, true, delta);
}
