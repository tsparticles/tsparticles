import type { IColor, IHsl, IHsla, IRangeColor, IRgb, IRgba } from "../Core/Interfaces/Colors.js";
import {
  clamp,
  getRandom,
  getRandomInRange,
  getRangeValue,
  mix,
  randomInRangeValue,
  setRangeValue,
} from "./MathUtils.js";
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
  lFactor,
  lMax,
  lMin,
  maxNits,
  midColorValue,
  millisecondsToSeconds,
  none,
  one,
  percentDenominator,
  phaseNumerator,
  randomColorValue,
  rgbMax,
  sMax,
  sMin,
  sNormalizedOffset,
  sextuple,
  triple,
} from "../Core/Utils/Constants.js";
import { isArray, isString } from "./TypeUtils.js";
import { AlterType } from "../Enums/Types/AlterType.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import { HdrMode } from "../Enums/Modes/HdrMode.js";
import type { HslAnimation } from "../Options/Classes/HslAnimation.js";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IOptionsColor } from "../Options/Interfaces/IOptionsColor.js";
import type { IParticleColorAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";
import type { IParticleHslAnimation } from "../Core/Interfaces/IParticleHslAnimation.js";
import type { Particle } from "../Core/Particle.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";
import { itemFromArray } from "./Utils.js";

const styleCache = new Map<string, string>(),
  maxStyleCacheSize = 2000,
  rgbFixedPrecision = 2,
  hslFixedPrecision = 2,
  hdrRgbFixedPrecision = 4,
  hdrHslFixedPrecision = 4,
  sdrReferenceWhiteNits = 203,
  hdrAnimationScale = sdrReferenceWhiteNits / maxNits,
  acesA = 2.51,
  acesB = 0.03,
  acesC = 2.43,
  acesD = 0.59,
  acesE = 0.14,
  saturationBoost = 1.15,
  lightnessBoost = 1.05,
  temperatureR = 1.05,
  temperatureB = 0.95,
  contrastFactor = 1.1,
  luminanceR = 0.2126,
  luminanceG = 0.7152,
  luminanceB = 0.0722,
  dynamicLuminanceFactor = 2,
  channelCount = 3,
  srgbThreshold = 0.04045,
  srgbDivisor = 12.92,
  srgbOffset = 0.055,
  srgbScale = 1.055,
  srgbExponent = 2.4,
  linearThreshold = 0.0031308,
  linearScale = 12.92;

/**
 * Generic cache function for color styles
 * @param key - the cache key
 * @param generator - the style generator function
 * @returns the cached style string
 */
function getCachedStyle(key: string, generator: () => string): string {
  let cached = styleCache.get(key);

  if (!cached) {
    cached = generator();

    if (styleCache.size > maxStyleCacheSize) {
      styleCache.clear();
    }

    styleCache.set(key, cached);
  }

  return cached;
}

/**
 * ACES Filmic tone mapping approximation
 * @param x - the linear value to map
 * @returns the tone-mapped value in [0, 1]
 */
function acesFilmic(x: number): number {
  return clamp((x * (acesA * x + acesB)) / (x * (acesC * x + acesD) + acesE), none, one);
}

/**
 * Converts an sRGB gamma-encoded value to linear space
 * @param c - the sRGB value in [0, 1]
 * @returns the linear value
 */
function srgbToLinear(c: number): number {
  return c <= srgbThreshold ? c / srgbDivisor : Math.pow((c + srgbOffset) / srgbScale, srgbExponent);
}

/**
 * Converts a linear value to sRGB gamma-encoded space
 * @param c - the linear value in [0, 1]
 * @returns the sRGB value
 */
function linearToSrgb(c: number): number {
  return c <= linearThreshold ? c * linearScale : srgbScale * Math.pow(c, one / srgbExponent) - srgbOffset;
}

/**
 * Applies HDR mode-specific color adjustments after tone mapping
 * @param r - the red channel [0, 1]
 * @param g - the green channel [0, 1]
 * @param b - the blue channel [0, 1]
 * @param mode - the HDR rendering mode
 * @returns the adjusted RGB values
 */
function applyHdrModeAdjustments(r: number, g: number, b: number, mode: HdrMode): { b: number; g: number; r: number } {
  switch (mode) {
    case HdrMode.vivid: {
      const avg = (r + g + b) / channelCount;

      return {
        b: clamp(avg + (b - avg) * saturationBoost, none, one) * lightnessBoost,
        g: clamp(avg + (g - avg) * saturationBoost, none, one) * lightnessBoost,
        r: clamp(avg + (r - avg) * saturationBoost, none, one) * lightnessBoost,
      };
    }

    case HdrMode.cinematic: {
      const tempR = r * temperatureR,
        tempB = b * temperatureB,
        avg = (tempR + g + tempB) / channelCount;

      return {
        b: clamp(avg + (tempB - avg) * contrastFactor, none, one),
        g: clamp(avg + (g - avg) * contrastFactor, none, one),
        r: clamp(avg + (tempR - avg) * contrastFactor, none, one),
      };
    }

    case HdrMode.dynamic: {
      const luminance = luminanceR * r + luminanceG * g + luminanceB * b,
        vividWeight = Math.min(one, luminance * dynamicLuminanceFactor),
        naturalWeight = one - vividWeight,
        avg = (r + g + b) / channelCount,
        vividR = clamp(avg + (r - avg) * saturationBoost, none, one) * lightnessBoost,
        vividG = clamp(avg + (g - avg) * saturationBoost, none, one) * lightnessBoost,
        vividB = clamp(avg + (b - avg) * saturationBoost, none, one) * lightnessBoost;

      return {
        b: r * naturalWeight + vividB * vividWeight,
        g: g * naturalWeight + vividG * vividWeight,
        r: r * naturalWeight + vividR * vividWeight,
      };
    }

    case HdrMode.standard:
      return { b, g, r };

    case HdrMode.natural:
    default:
      return { b, g, r };
  }
}

/**
 * Converts a string to a RGBA color.
 * @param pluginManager - The plugin manager
 * @param input - A string that represents a color.
 * @returns the converted color from string to {@link IRgba} interfaec
 */
function stringToRgba(pluginManager: PluginManager, input: string): IRgba | undefined {
  if (!input) {
    return;
  }

  for (const manager of pluginManager.colorManagers.values()) {
    if (manager.accepts(input)) {
      return manager.parseString(input);
    }
  }

  return undefined;
}

/**
 * Gets the particles color
 * @param pluginManager - the plugin manager
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false for ignoring the index parameter
 * @returns returns a RGB color in the given range
 */
export function rangeColorToRgb(
  pluginManager: PluginManager,
  input?: string | IRangeColor,
  index?: number,
  useIndex = true,
): IRgb | undefined {
  if (!input) {
    return;
  }

  const color = isString(input) ? { value: input } : input;

  if (isString(color.value)) {
    return colorToRgb(pluginManager, color.value, index, useIndex);
  }

  if (isArray(color.value)) {
    const value = itemFromArray(color.value, index, useIndex);

    if (!value) {
      return;
    }

    return rangeColorToRgb(pluginManager, {
      value,
    });
  }

  for (const manager of pluginManager.colorManagers.values()) {
    const res = manager.handleRangeColor(color);

    if (res) {
      return res;
    }
  }

  return undefined;
}

/**
 * Gets the particles color
 * @param pluginManager - the plugin manager
 * @param input - the input color to convert in {@link IRgb} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns returns an RGB color taken from a {@link IColor} object
 */
export function colorToRgb(
  pluginManager: PluginManager,
  input?: string | IColor,
  index?: number,
  useIndex = true,
): IRgb | undefined {
  if (!input) {
    return;
  }

  const color = isString(input) ? { value: input } : input;

  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(pluginManager, color.value);
  }

  if (isArray(color.value)) {
    const value = itemFromArray(color.value, index, useIndex);

    if (!value) {
      return;
    }

    return colorToRgb(pluginManager, {
      value,
    });
  }

  for (const manager of pluginManager.colorManagers.values()) {
    const res = manager.handleColor(color);

    if (res) {
      return res;
    }
  }

  return undefined;
}

/**
 * Gets the particles color
 * @param pluginManager - the plugin manager
 * @param color - the input color to convert in {@link IHsl} object
 * @param index - the array index, if needed
 * @param useIndex - set to false to ignore the index parameter
 * @returns the {@link IHsl} object
 */
export function rangeColorToHsl(
  pluginManager: PluginManager,
  color: string | IRangeColor | undefined,
  index?: number,
  useIndex = true,
): IHsl | undefined {
  const rgb = rangeColorToRgb(pluginManager, color, index, useIndex);

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
    if (r1 === max) {
      res.h = (g1 - b1) / (max - min);
    } else if (g1 === max) {
      res.h = double + (b1 - r1) / (max - min);
    } else {
      res.h = double * double + (r1 - g1) / (max - min);
    }
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
 * @param pluginManager - the plugin manager
 * @param input - the input color to convert in alpha value
 * @returns the alpha value
 */
export function stringToAlpha(pluginManager: PluginManager, input: string): number | undefined {
  return stringToRgba(pluginManager, input)?.a;
}

/**
 * Converts hexadecimal string (HTML color code) in a {@link IRgb} object
 * @param pluginManager - the plugin manager
 * @param input - the hexadecimal string (#f70 or #ff7700)
 * @returns the {@link IRgb} object
 */
export function stringToRgb(pluginManager: PluginManager, input: string): IRgb | undefined {
  return stringToRgba(pluginManager, input);
}

/**
 * Converts a Hue Saturation Lightness ({@link IHsl}) object in a {@link IRgb} object
 * @param temp1 - The temp1
 * @param temp2 - The temp2
 * @param temp3 - The temp3
 * @returns the {@link IRgb} object
 */
function hslChannel(temp1: number, temp2: number, temp3: number): number {
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
}

/**
 *
 * @param hsl - The HSL color
 * @returns The result
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
    const grayscaleValue = Math.round(lNormalized * rgbMax);

    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }

  const temp1 =
      lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized,
    temp2 = double * lNormalized - temp1,
    phaseThird = phaseNumerator / triple,
    red = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized + phaseThird)),
    green = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized)),
    blue = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized - phaseThird));

  return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
}

/**
 *
 * @param hsl - The HSL color
 * @returns The result with floating-point RGB values (0.0-255.0)
 */
export function hslToRgbFloat(hsl: IHsl): IRgb {
  const h = ((hsl.h % hMax) + hMax) % hMax,
    s = Math.max(sMin, Math.min(sMax, hsl.s)),
    l = Math.max(lMin, Math.min(lMax, hsl.l)),
    hNormalized = h / hMax,
    sNormalized = s / sMax,
    lNormalized = l / lMax;

  if (s === sMin) {
    const grayscaleValue = lNormalized * rgbMax;

    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }

  const temp1 =
      lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized,
    temp2 = double * lNormalized - temp1,
    phaseThird = phaseNumerator / triple,
    red = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized + phaseThird)),
    green = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized)),
    blue = Math.min(rgbMax, rgbMax * hslChannel(temp2, temp1, hNormalized - phaseThird));

  return { r: red, g: green, b: blue };
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
 * @param hdr - the HDR flag
 * @returns the random ({@link IRgb}) color
 */
export function getRandomRgbColor(min?: number, hdr?: boolean): IRgb {
  const fixedMin = min ?? defaultRgbMin;

  if (hdr) {
    return {
      r: getRandomInRange(fixedMin, rgbMax),
      g: getRandomInRange(fixedMin, rgbMax),
      b: getRandomInRange(fixedMin, rgbMax),
    };
  }

  const fixedMax = rgbMax + identity,
    getRgbInRangeValue = (): number => Math.floor(getRandomInRange(fixedMin, fixedMax));

  return {
    b: getRgbInRangeValue(),
    g: getRgbInRangeValue(),
    r: getRgbInRangeValue(),
  };
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param hdr - whether the color is in HDR mode or not
 * @param opacity - the opacity value
 * @param peakNits - the peak brightness in nits for HDR rendering
 * @param mode - the HDR rendering mode
 * @returns the CSS style string
 */
export function getStyleFromRgb(
  color: IRgb,
  hdr: boolean,
  opacity?: number,
  peakNits?: number,
  mode?: HdrMode,
): string {
  const rgbPrecision = hdr ? hdrRgbFixedPrecision : rgbFixedPrecision,
    op = opacity ?? defaultOpacity,
    key = `rgb-${color.r.toFixed(rgbPrecision)}-${color.g.toFixed(rgbPrecision)}-${color.b.toFixed(rgbPrecision)}-${hdr ? "hdr" : "sdr"}-${op.toString()}-${(peakNits ?? maxNits).toString()}-${mode ?? HdrMode.standard}`;

  return getCachedStyle(key, () =>
    hdr ? getHdrStyleFromRgb(color, opacity, peakNits, mode) : getSdrStyleFromRgb(color, opacity),
  );
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param opacity - the opacity value
 * @param peakNits - the peak brightness in nits, for future HDR API support, defaults to 400
 * @param mode - the HDR mode
 * @returns the CSS style string
 */
function getHdrStyleFromRgb(
  color: IRgb,
  opacity?: number,
  peakNits = maxNits,
  mode: HdrMode = HdrMode.standard,
): string {
  const headroom = peakNits / sdrReferenceWhiteNits,
    middleGray = 0.18,
    mapped = hdrToneMapColor(color, headroom, middleGray, mode);

  return `color(display-p3 ${mapped.r.toString()} ${mapped.g.toString()} ${mapped.b.toString()} / ${(opacity ?? defaultOpacity).toString()})`;
}

/**
 * Applies HDR tone mapping preserving hue and saturation.
 * Maps luminance through ACES Filmic while scaling channels proportionally.
 * @param color - the input RGB color
 * @param headroom - the HDR headroom ratio
 * @param middleGray - the middle gray threshold
 * @param mode - the HDR mode
 * @returns the tone-mapped RGB values
 */
function hdrToneMapColor(
  color: IRgb,
  headroom: number,
  middleGray: number,
  mode: HdrMode,
): { b: number; g: number; r: number } {
  const rNorm = color.r / rgbMax,
    gNorm = color.g / rgbMax,
    bNorm = color.b / rgbMax;

  if (mode !== HdrMode.natural && mode !== HdrMode.vivid && mode !== HdrMode.cinematic && mode !== HdrMode.dynamic) {
    return { b: bNorm, g: gNorm, r: rNorm };
  }

  const luminance = luminanceR * rNorm + luminanceG * gNorm + luminanceB * bNorm,
    mappedLuminance = hdrToneMap(luminance, headroom, middleGray),
    scale = luminance > none ? mappedLuminance / luminance : one;

  return applyHdrModeAdjustments(
    clamp(rNorm * scale, none, one),
    clamp(gNorm * scale, none, one),
    clamp(bNorm * scale, none, one),
    mode,
  );
}

/**
 * Applies ACES Filmic tone mapping with selective HDR expansion above middle gray.
 * Preserves SDR fidelity for dark tones while extending bright highlights.
 * @param normalized - the sRGB value normalized to [0, 1]
 * @param headroom - the HDR headroom ratio (peakNits / referenceWhite)
 * @param middleGray - the middle gray threshold
 * @returns the tone-mapped value
 */
function hdrToneMap(normalized: number, headroom: number, middleGray: number): number {
  if (normalized <= middleGray) {
    return acesFilmic(normalized);
  }

  const expanded = normalized + (normalized - middleGray) * (headroom - one);

  return acesFilmic(expanded);
}

/**
 * Gets a CSS style string from a {@link IRgb} object and opacity value
 * @param color - the {@link IRgb} input color
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
function getSdrStyleFromRgb(color: IRgb, opacity?: number): string {
  return `rgba(${color.r.toString()}, ${color.g.toString()}, ${color.b.toString()}, ${(opacity ?? defaultOpacity).toString()})`;
}

/**
 * Gets a CSS style string from a {@link IHsl} object and opacity value
 * @param color - the {@link IHsl} input color
 * @param hdr - whether the color is in HDR mode or not
 * @param opacity - the opacity value
 * @param peakNits - the peak brightness in nits for HDR rendering
 * @param mode - the HDR rendering mode
 * @returns the CSS style string
 */
export function getStyleFromHsl(
  color: IHsl,
  hdr: boolean,
  opacity?: number,
  peakNits?: number,
  mode?: HdrMode,
): string {
  const hslPrecision = hdr ? hdrHslFixedPrecision : hslFixedPrecision,
    op = opacity ?? defaultOpacity,
    key = `hsl-${color.h.toFixed(hslPrecision)}-${color.s.toFixed(hslPrecision)}-${color.l.toFixed(hslPrecision)}-${hdr ? "hdr" : "sdr"}-${op.toString()}-${(peakNits ?? maxNits).toString()}-${mode ?? HdrMode.standard}`;

  return getCachedStyle(key, () =>
    hdr
      ? getStyleFromRgb(hslToRgbFloat(color), true, opacity, peakNits, mode)
      : `hsla(${color.h.toString()}, ${color.s.toString()}%, ${color.l.toString()}%, ${op.toString()})`,
  );
}

/**
 * Mixes two colors based on size proportions
 * @param color1 - the first color
 * @param color2 - the second color
 * @param size1 - the size of the first color
 * @param size2 - the size of the second color
 * @param hdr - whether to mix in linear space for HDR
 * @returns the mixed RGB color
 */
export function colorMix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number, hdr?: boolean): IRgb {
  let rgb1 = color1 as IRgb,
    rgb2 = color2 as IRgb;

  if (!("r" in rgb1)) {
    rgb1 = hdr ? hslToRgbFloat(color1 as IHsl) : hslToRgb(color1 as IHsl);
  }

  if (!("r" in rgb2)) {
    rgb2 = hdr ? hslToRgbFloat(color2 as IHsl) : hslToRgb(color2 as IHsl);
  }

  if (hdr) {
    const lin1 = {
        b: srgbToLinear(rgb1.b / rgbMax),
        g: srgbToLinear(rgb1.g / rgbMax),
        r: srgbToLinear(rgb1.r / rgbMax),
      },
      lin2 = {
        b: srgbToLinear(rgb2.b / rgbMax),
        g: srgbToLinear(rgb2.g / rgbMax),
        r: srgbToLinear(rgb2.r / rgbMax),
      },
      totalWeight = size1 + size2;

    return {
      b: linearToSrgb((lin1.b * size1 + lin2.b * size2) / totalWeight) * rgbMax,
      g: linearToSrgb((lin1.g * size1 + lin2.g * size2) / totalWeight) * rgbMax,
      r: linearToSrgb((lin1.r * size1 + lin2.r * size2) / totalWeight) * rgbMax,
    };
  }

  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2),
  };
}

/**
 * Gets the link color between two linked particles
 * @param p1 - the first particle
 * @param p2 - the second particle
 * @param linkColor - the link color configuration
 * @param hdr - the HDR flag
 * @returns the calculated link color
 */
export function getLinkColor(p1: Particle, p2?: Particle, linkColor?: string | IRgb, hdr?: boolean): IRgb | undefined {
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),
      destColor = p2?.getFillColor() ?? p2?.getStrokeColor();

    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius(), hdr);
    } else {
      const hslColor = sourceColor ?? destColor;

      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor as IRgb;
  }

  return undefined;
}

/**
 * Gets a random link color or a specific one based on parameters
 * @param pluginManager - the plugin manager
 * @param optColor - the color option
 * @param blink - whether the link color blinks
 * @param consent - whether the user consented
 * @returns a link color
 */
export function getLinkRandomColor(
  pluginManager: PluginManager,
  optColor: string | IOptionsColor,
  blink: boolean,
  consent: boolean,
): IRgb | string | undefined {
  const color = isString(optColor) ? optColor : optColor.value;

  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToRgb(pluginManager, {
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
    return rangeColorToRgb(pluginManager, {
      value: color,
    });
  }
}

/**
 * Gets the HSL color values from an HSL animation
 * @param animation - the HSL animation to extract values from
 * @returns the HSL color or undefined
 */
export function getHslFromAnimation(animation?: IParticleHslAnimation): IHsl | undefined {
  return animation === undefined
    ? undefined
    : {
        h: animation.h.value,
        s: animation.s.value,
        l: animation.l.value,
      };
}

/**
 * Creates an HSL animation from a base HSL color and animation options
 * @param hsl - the base HSL color
 * @param animationOptions - the HSL animation options
 * @param reduceFactor - the reduce factor for velocity
 * @returns the HSL animation data
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
      min: hMin,
      max: hMax,
    },
    s: {
      enable: false,
      value: hsl.s,
      min: sMin,
      max: sMax,
    },
    l: {
      enable: false,
      value: hsl.l,
      min: lMin,
      max: lMax,
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
 * @param colorValue - The color value
 * @param colorAnimation - The colorAnimation
 * @param reduceFactor - The reduceFactor
 */
function setColorAnimation(
  colorValue: IParticleColorAnimation,
  colorAnimation: IColorAnimation,
  reduceFactor: number,
): void {
  colorValue.enable = colorAnimation.enable;
  colorValue.min = colorAnimation.min;
  colorValue.max = colorAnimation.max;

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
 * Updates a color animation value for the current frame
 * @param data - the color animation data
 * @param decrease - whether the color should decrease over time
 * @param delta - the frame delta time
 * @param hdr - the HDR flag
 */
export function updateColorValue(data: IParticleColorAnimation, decrease: boolean, delta: IDelta, hdr?: boolean): void {
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

  const offset = data.offset ? randomInRangeValue(data.offset) : minOffset,
    velocity =
      ((data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor) * (hdr ? hdrAnimationScale : identity),
    decay = data.decay ?? identity,
    max = data.max,
    min = data.min;

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

    if (data.value < min) {
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
 * Updates all HSL color channels for the current frame
 * @param color - the HSL animation to update
 * @param delta - the frame delta time
 * @param hdr - the HDR flag
 */
export function updateColor(color: IParticleHslAnimation | undefined, delta: IDelta, hdr?: boolean): void {
  if (!color) {
    return;
  }

  const { h, s, l } = color;

  updateColorValue(h, false, delta, hdr);
  updateColorValue(s, true, delta, hdr);
  updateColorValue(l, true, delta, hdr);
}

/**
 * Alters HSL values for enlighten or darken the given color.
 * @param color - The color to enlighten or darken.
 * @param type - The type of alteration.
 * @param value - The value of the alteration.
 * @returns the altered {@link IHsl} color
 */
export function alterHsl(color: IHsl, type: AlterType, value: number): IHsl {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === AlterType.darken ? -lFactor : lFactor) * value,
  };
}
