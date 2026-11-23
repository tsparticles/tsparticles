import type {
  IColor,
  IHsl,
  IHsla,
  IOklch,
  IOklcha,
  IRangeColor,
  IRangeOklch,
  IRangeSpacedRgb,
  IRangeValueColor,
  IRgb,
  IRgba,
  ISpacedRgb,
  IValueColor,
} from "../Core/Interfaces/Colors.js";
import {
  clamp,
  getRandom,
  getRandomInRange,
  getRangeValue,
  mix,
  parseAlpha,
  randomInRangeValue,
  setRangeValue,
} from "./MathUtils.js";
import {
  decayOffset,
  defaultAlpha,
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
import {
  displayP3ToOklch,
  mapOklchToDisplayP3,
  mapOklchToSrgb,
  mixOklch,
  oklchToDisplayP3Float,
  rgbToDisplayP3Float,
  rgbToOklch,
} from "./OklchUtils.js";
import { isArray, isString } from "./TypeUtils.js";
import { AlterType } from "../Enums/Types/AlterType.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import { HdrMode } from "../Enums/Modes/HdrMode.js";
import type { IColorAnimation } from "../Options/Interfaces/IColorAnimation.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IOptionsColor } from "../Options/Interfaces/IOptionsColor.js";
import type { IParticleColorAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";
import type { IParticleOklchAnimation } from "../Core/Interfaces/IParticleOklchAnimation.js";
import type { OklchAnimation } from "../Options/Classes/OklchAnimation.js";
import type { Particle } from "../Core/Particles/Particle.js";
import type { PluginManager } from "../Core/Engine/PluginManager.js";
import type { RangeValue } from "../Types/RangeValue.js";
import { itemFromArray } from "./Utils.js";

const styleCache = new Map<string, string>(),
  maxStyleCacheSize = 2000,
  maxHdrCacheMisses = 64,
  hdrCacheProbeInterval = 64,
  rgbNoiseThreshold = 0.001,
  hueGradsPerTurn = 400,
  rgbFixedPrecision = 2,
  hslFixedPrecision = 2,
  hdrRgbFixedPrecision = 4,
  hdrHslFixedPrecision = 4,
  sdrReferenceWhiteNits = 203,
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
  displayP3LuminanceR = 0.2289745641,
  displayP3LuminanceG = 0.6917385218,
  displayP3LuminanceB = 0.0792869141,
  dynamicLuminanceFactor = 2,
  channelCount = 3,
  srgbThreshold = 0.04045,
  srgbDivisor = 12.92,
  srgbOffset = 0.055,
  srgbScale = 1.055,
  srgbExponent = 2.4,
  linearThreshold = 0.0031308,
  linearScale = 12.92;

let hdrCacheMisses = 0,
  hdrCacheCooldown = 0,
  lastOklchStyle:
    | {
        alpha: number;
        color: IOklch;
        hdr: boolean;
        mode: HdrMode | undefined;
        outputColorSpace: PredefinedColorSpace;
        peakNits: number | undefined;
        style: string;
      }
    | undefined;

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

    cacheStyle(key, cached);
  }

  return cached;
}

/** Stores a derived style in the bounded, owner-independent output cache. */
function cacheStyle(key: string, style: string): void {
  if (styleCache.size >= maxStyleCacheSize) {
    styleCache.clear();
  }

  styleCache.set(key, style);
}

/** Rechecks the HDR map periodically when a stream has little reuse. */
function getCachedOklchHdrStyle(
  color: IOklch,
  alpha: number,
  peakNits?: number,
  mode?: HdrMode,
): string {
  if (hdrCacheCooldown > 0) {
    hdrCacheCooldown--;

    return getHdrStyleFromRgb(
      oklchToDisplayP3Float(color),
      alpha,
      peakNits,
      mode,
    );
  }

  const key = `oklch-hdr-${color.l}-${color.c}-${color.h}-${alpha}-${peakNits ?? maxNits}-${mode ?? HdrMode.standard}`,
    cached = styleCache.get(key);

  if (cached) {
    hdrCacheMisses = 0;

    return cached;
  }

  hdrCacheMisses = Math.min(hdrCacheMisses + 1, maxHdrCacheMisses);

  if (hdrCacheMisses === maxHdrCacheMisses) {
    hdrCacheCooldown = hdrCacheProbeInterval;
  }

  const style = getHdrStyleFromRgb(
    oklchToDisplayP3Float(color),
    alpha,
    peakNits,
    mode,
  );

  cacheStyle(key, style);

  return style;
}

function cleanSrgbRoundoff(color: IRgb): IRgb {
  const clean = (channel: number): number => {
    const integer = Math.round(channel);

    return Math.abs(channel - integer) < rgbNoiseThreshold ? integer : channel;
  };

  return { b: clean(color.b), g: clean(color.g), r: clean(color.r) };
}

/**
 * ACES Filmic tone mapping approximation
 * @param x - the linear value to map
 * @returns the tone-mapped value in [0, 1]
 */
function acesFilmic(x: number): number {
  return clamp(
    (x * (acesA * x + acesB)) / (x * (acesC * x + acesD) + acesE),
    none,
    one,
  );
}

/**
 * Converts a signed sRGB-compatible gamma-encoded channel to linear light
 * @param c - the encoded channel, including extended values outside [0, 1]
 * @returns the linear value
 */
function srgbToLinear(c: number): number {
  return Math.abs(c) <= srgbThreshold
    ? c / srgbDivisor
    : Math.sign(c) *
        Math.pow((Math.abs(c) + srgbOffset) / srgbScale, srgbExponent);
}

/**
 * Converts a signed linear channel to sRGB-compatible encoded space
 * @param c - the linear channel, including values above 1 for HDR
 * @returns the encoded channel
 */
function linearToSrgb(c: number): number {
  return Math.abs(c) <= linearThreshold
    ? c * linearScale
    : Math.sign(c) *
        (srgbScale * Math.pow(Math.abs(c), one / srgbExponent) - srgbOffset);
}

/**
 * Applies HDR mode-specific color adjustments after tone mapping
 * @param r - the red channel
 * @param g - the green channel
 * @param b - the blue channel
 * @param mode - the HDR rendering mode
 * @param maxChannel - the maximum linear channel value the display can reproduce
 * @returns the adjusted RGB values
 */
function applyHdrModeAdjustments(
  r: number,
  g: number,
  b: number,
  mode: HdrMode,
  maxChannel: number,
): { b: number; g: number; r: number } {
  switch (mode) {
    case HdrMode.vivid: {
      const avg = (r + g + b) / channelCount;

      return {
        b: clamp(
          clamp(avg + (b - avg) * saturationBoost, none, maxChannel) *
            lightnessBoost,
          none,
          maxChannel,
        ),
        g: clamp(
          clamp(avg + (g - avg) * saturationBoost, none, maxChannel) *
            lightnessBoost,
          none,
          maxChannel,
        ),
        r: clamp(
          clamp(avg + (r - avg) * saturationBoost, none, maxChannel) *
            lightnessBoost,
          none,
          maxChannel,
        ),
      };
    }

    case HdrMode.cinematic: {
      const tempR = r * temperatureR,
        tempB = b * temperatureB,
        avg = (tempR + g + tempB) / channelCount;

      return {
        b: clamp(avg + (tempB - avg) * contrastFactor, none, maxChannel),
        g: clamp(avg + (g - avg) * contrastFactor, none, maxChannel),
        r: clamp(avg + (tempR - avg) * contrastFactor, none, maxChannel),
      };
    }

    case HdrMode.dynamic: {
      const luminance =
          displayP3LuminanceR * r +
          displayP3LuminanceG * g +
          displayP3LuminanceB * b,
        vividWeight = Math.min(one, luminance * dynamicLuminanceFactor),
        naturalWeight = one - vividWeight,
        avg = (r + g + b) / channelCount,
        vividR =
          clamp(avg + (r - avg) * saturationBoost, none, maxChannel) *
          lightnessBoost,
        vividG =
          clamp(avg + (g - avg) * saturationBoost, none, maxChannel) *
          lightnessBoost,
        vividB =
          clamp(avg + (b - avg) * saturationBoost, none, maxChannel) *
          lightnessBoost;

      return {
        b: clamp(b * naturalWeight + vividB * vividWeight, none, maxChannel),
        g: clamp(g * naturalWeight + vividG * vividWeight, none, maxChannel),
        r: clamp(r * naturalWeight + vividR * vividWeight, none, maxChannel),
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
function stringToRgba(
  pluginManager: PluginManager,
  input: string,
): IRgba | undefined {
  if (!input) {
    return;
  }

  const color = rangeColorToOklch(pluginManager, input),
    mapped = color ? mapOklchToSrgb(color).rgb : undefined;

  return color && mapped
    ? { ...cleanSrgbRoundoff(mapped), a: color.a }
    : undefined;
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
  const raw = isString(input) ? input : input?.value;

  if (raw === randomColorValue) {
    return getRandomRgbColor(
      undefined,
      undefined,
      pluginManager.engine.getRandomFn(),
    );
  }

  const color = input
    ? rangeColorToOklch(pluginManager, input, index, useIndex)
    : undefined;

  return color ? mapOklchToSrgb(color).rgb : undefined;
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

  let raw: string | undefined;

  if (isString(input)) {
    raw = input;
  } else if (isString(input.value)) {
    raw = input.value;
  }

  if (raw === randomColorValue) {
    return getRandomRgbColor(
      undefined,
      undefined,
      pluginManager.engine.getRandomFn(),
    );
  }

  if (isString(input) || raw !== undefined) {
    return raw ? stringToRgb(pluginManager, raw) : undefined;
  }

  if (isArray(input.value)) {
    const value = itemFromArray(
      input.value,
      index,
      useIndex,
      pluginManager.engine.getRandomFn(),
    );

    return value ? colorToRgb(pluginManager, { value }) : undefined;
  }

  for (const manager of pluginManager.colorManagers.values()) {
    const handled = manager.handleColorOklch(input),
      resolved = handled ? normalizeOklchaResult(handled) : undefined,
      mapped = resolved ? mapOklchToSrgb(resolved).rgb : undefined;

    if (mapped) {
      return cleanSrgbRoundoff(mapped);
    }
  }

  const color = rangeColorToOklch(pluginManager, input, index, useIndex);

  return color ? cleanSrgbRoundoff(mapOklchToSrgb(color).rgb) : undefined;
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

function normalizeOklchaResult(color: IOklcha): IOklcha | undefined {
  if (
    ![color.a, color.c, color.h, color.l].every(Number.isFinite) ||
    color.a < none ||
    color.a > identity ||
    color.c < none ||
    color.l < none ||
    color.l > percentDenominator
  ) {
    return;
  }

  return { ...color, h: ((color.h % hMax) + hMax) % hMax };
}

function parseCssHueAngle(value: number, unit?: string): number {
  switch (unit?.toLowerCase()) {
    case "rad":
      return (value * hMax) / (2 * Math.PI);

    case "grad":
      return (value * hMax) / hueGradsPerTurn;

    case "turn":
      return value * hMax;

    default:
      return value;
  }
}

/** Resolves an input color to canonical OKLCH (lightness 0–100). */
export function rangeColorToOklch(
  pluginManager: PluginManager,
  color: string | IColor | IRangeColor | undefined,
  index?: number,
  useIndex = true,
): IOklcha | undefined {
  if (!color) {
    return;
  }

  if (isString(color)) {
    for (const manager of pluginManager.colorManagers.values()) {
      if (manager.accepts(color)) {
        const resolved = manager.parseStringOklch(color),
          normalized = resolved ? normalizeOklchaResult(resolved) : undefined;

        if (normalized) {
          return normalized;
        }

        break;
      }
    }

    const match =
      /^oklch\(\s*([+-]?(?:\d+\.?\d*|\.\d+))(%?)\s+([+-]?(?:\d+\.?\d*|\.\d+))\s+([+-]?(?:\d+\.?\d*|\.\d+))(deg|°|rad|grad|turn)?(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i.exec(
        color,
      );

    if (match) {
      const rawLightness = Number(match[1]),
        lightness = rawLightness * (match[2] ? identity : percentDenominator),
        chroma = Number(match[3]),
        hue = parseCssHueAngle(Number(match[4]), match[5]),
        alpha = parseAlpha(match[6]);

      if (
        ![lightness, chroma, hue, alpha].every(Number.isFinite) ||
        rawLightness < none ||
        rawLightness > (match[2] ? percentDenominator : identity) ||
        chroma < none ||
        alpha < none ||
        alpha > identity
      ) {
        return;
      }

      return {
        a: alpha,
        c: chroma,
        h: ((hue % hMax) + hMax) % hMax,
        l: lightness,
      };
    }

    const p3Match =
      /^color\(\s*display-p3\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?%?)\s+([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?%?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)$/i.exec(
        color,
      );

    if (p3Match) {
      const parseChannel = (channel: string): number =>
          (channel.endsWith("%")
            ? Number.parseFloat(channel) / percentDenominator
            : Number.parseFloat(channel)) * rgbMax,
        r = parseChannel(p3Match[1] ?? "0"),
        g = parseChannel(p3Match[2] ?? "0"),
        b = parseChannel(p3Match[3] ?? "0"),
        alpha = parseAlpha(p3Match[4]);

      if (
        [r, g, b, alpha].every(Number.isFinite) &&
        alpha >= none &&
        alpha <= identity
      ) {
        return { ...displayP3ToOklch({ r, g, b }), a: alpha };
      }
    }
  } else if (isString(color.value)) {
    return rangeColorToOklch(pluginManager, color.value, index, useIndex);
  } else if (isArray(color.value)) {
    const value = itemFromArray(
      color.value,
      index,
      useIndex,
      pluginManager.engine.getRandomFn(),
    );

    return value
      ? rangeColorToOklch(pluginManager, isString(value) ? value : { value })
      : undefined;
  } else if (typeof color.value === "object") {
    const rawValue = color.value as { rgb?: unknown } | null,
      sourceValue =
        rawValue?.rgb && typeof rawValue.rgb === "object"
          ? rawValue.rgb
          : color.value,
      source = sourceValue as
        | (Partial<ISpacedRgb & IRangeSpacedRgb> & {
            a?: number | RangeValue;
            b?: number | RangeValue;
            colorSpace?: string;
            g?: number | RangeValue;
            hdr?: unknown;
            p3?: unknown;
            r?: number | RangeValue;
          })
        | undefined;

    if (
      source?.r !== undefined &&
      source.g !== undefined &&
      source.b !== undefined
    ) {
      // A boolean cannot describe an HDR source transfer function, scale, and reference white.
      // Reject it here instead of letting a legacy RGB manager silently treat it as sRGB.
      if ("hdr" in source) {
        return;
      }

      const hasColorSpace = source.colorSpace !== undefined,
        hasP3 = source.p3 !== undefined;

      if (
        (hasColorSpace &&
          source.colorSpace !== "srgb" &&
          source.colorSpace !== "display-p3") ||
        (hasP3 && typeof source.p3 !== "boolean") ||
        (hasColorSpace &&
          hasP3 &&
          (source.p3 ? "display-p3" : "srgb") !== source.colorSpace)
      ) {
        return;
      }

      const random = pluginManager.engine.getRandomFn(),
        r = getRangeValue(source.r, random),
        g = getRangeValue(source.g, random),
        b = getRangeValue(source.b, random),
        alpha =
          source.a === undefined
            ? defaultAlpha
            : getRangeValue(source.a, random);

      if (
        [r, g, b, alpha].every(Number.isFinite) &&
        alpha >= none &&
        alpha <= identity
      ) {
        const channels = { b, g, r },
          sourceColorSpace =
            source.colorSpace ?? (source.p3 ? "display-p3" : "srgb"),
          converted =
            sourceColorSpace === "display-p3"
              ? displayP3ToOklch(channels)
              : rgbToOklch(channels);

        return { ...converted, a: alpha };
      }

      return;
    }

    for (const manager of pluginManager.colorManagers.values()) {
      const resolved = manager.handleRangeColorOklch(color),
        normalized = resolved ? normalizeOklchaResult(resolved) : undefined;

      if (normalized) {
        return normalized;
      }
    }

    const value = color.value as
        IValueColor | IRangeValueColor | IOklch | IOklcha | IRangeOklch,
      oklch = ("oklch" in value ? value.oklch : value) as
        IOklch | IRangeOklch | undefined;

    if (oklch && "c" in oklch && "h" in oklch && "l" in oklch) {
      const random = pluginManager.engine.getRandomFn(),
        l = getRangeValue(oklch.l, random),
        c = getRangeValue(oklch.c, random),
        h = getRangeValue(oklch.h, random),
        alpha = (oklch as unknown as { a?: number }).a ?? defaultAlpha;

      if (
        [l, c, h, alpha].every(Number.isFinite) &&
        c >= none &&
        l >= none &&
        l <= percentDenominator &&
        alpha >= none &&
        alpha <= identity
      ) {
        return {
          a: alpha,
          c,
          h: ((h % hMax) + hMax) % hMax,
          l,
        };
      }
    }
  }

  return undefined;
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
    res.s =
      res.l < half
        ? (max - min) / (max + min)
        : (max - min) / (double - max - min);
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
export function stringToAlpha(
  pluginManager: PluginManager,
  input: string,
): number | undefined {
  return stringToRgba(pluginManager, input)?.a;
}

/**
 * Converts hexadecimal string (HTML color code) in a {@link IRgb} object
 * @param pluginManager - the plugin manager
 * @param input - the hexadecimal string (#f70 or #ff7700)
 * @returns the {@link IRgb} object
 */
export function stringToRgb(
  pluginManager: PluginManager,
  input: string,
): IRgb | undefined {
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

  const temp2 =
      lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized,
    temp1 = double * lNormalized - temp2,
    phaseThird = phaseNumerator / triple,
    red = Math.min(
      rgbMax,
      rgbMax * hslChannel(temp1, temp2, hNormalized + phaseThird),
    ),
    green = Math.min(rgbMax, rgbMax * hslChannel(temp1, temp2, hNormalized)),
    blue = Math.min(
      rgbMax,
      rgbMax * hslChannel(temp1, temp2, hNormalized - phaseThird),
    );

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

  const temp2 =
      lNormalized < half
        ? lNormalized * (sNormalizedOffset + sNormalized)
        : lNormalized + sNormalized - lNormalized * sNormalized,
    temp1 = double * lNormalized - temp2,
    phaseThird = phaseNumerator / triple,
    red = Math.min(
      rgbMax,
      rgbMax * hslChannel(temp1, temp2, hNormalized + phaseThird),
    ),
    green = Math.min(rgbMax, rgbMax * hslChannel(temp1, temp2, hNormalized)),
    blue = Math.min(
      rgbMax,
      rgbMax * hslChannel(temp1, temp2, hNormalized - phaseThird),
    );

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
export function getRandomRgbColor(
  min?: number,
  hdr?: boolean,
  random?: () => number,
): IRgb {
  const fixedMin = min ?? defaultRgbMin;

  if (hdr) {
    return {
      r: getRandomInRange(fixedMin, rgbMax, random),
      g: getRandomInRange(fixedMin, rgbMax, random),
      b: getRandomInRange(fixedMin, rgbMax, random),
    };
  }

  const fixedMax = rgbMax + identity,
    getRgbInRangeValue = (): number =>
      Math.floor(getRandomInRange(fixedMin, fixedMax, random));

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
 * @deprecated Use {@link getStyleFromOklch} for engine color output; this helper preserves the legacy RGB output API.
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
    key = hdr
      ? `rgb-${color.r.toFixed(rgbPrecision)}-${color.g.toFixed(rgbPrecision)}-${color.b.toFixed(rgbPrecision)}-hdr-${op.toString()}-${(peakNits ?? maxNits).toString()}-${mode ?? HdrMode.standard}`
      : `rgb-${color.r.toFixed(rgbPrecision)}-${color.g.toFixed(rgbPrecision)}-${color.b.toFixed(rgbPrecision)}-sdr-${op.toString()}`;

  return getCachedStyle(key, () =>
    hdr
      ? getHdrStyleFromRgb(rgbToDisplayP3Float(color), opacity, peakNits, mode)
      : getSdrStyleFromRgb(color, opacity),
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

  if (
    mode !== HdrMode.natural &&
    mode !== HdrMode.vivid &&
    mode !== HdrMode.cinematic &&
    mode !== HdrMode.dynamic
  ) {
    return { b: bNorm, g: gNorm, r: rNorm };
  }

  const maxChannel = Math.max(one, headroom),
    rLinear = srgbToLinear(rNorm),
    gLinear = srgbToLinear(gNorm),
    bLinear = srgbToLinear(bNorm),
    luminance =
      displayP3LuminanceR * rLinear +
      displayP3LuminanceG * gLinear +
      displayP3LuminanceB * bLinear,
    mappedLuminance = hdrToneMap(luminance, headroom, middleGray),
    scale = luminance > none ? mappedLuminance / luminance : one,
    adjusted = applyHdrModeAdjustments(
      clamp(rLinear * scale, none, maxChannel),
      clamp(gLinear * scale, none, maxChannel),
      clamp(bLinear * scale, none, maxChannel),
      mode,
      maxChannel,
    );

  return {
    b: linearToSrgb(adjusted.b),
    g: linearToSrgb(adjusted.g),
    r: linearToSrgb(adjusted.r),
  };
}

/**
 * Applies ACES Filmic tone mapping with selective HDR expansion above middle gray.
 * Preserves dark tones while extending bright highlights in linear Display-P3 light.
 * @param normalized - the linear luminance normalized to SDR reference white
 * @param headroom - the HDR headroom ratio (peakNits / referenceWhite)
 * @param middleGray - the middle gray threshold
 * @returns the tone-mapped value
 */
function hdrToneMap(
  normalized: number,
  headroom: number,
  middleGray: number,
): number {
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
 * @deprecated Use {@link getStyleFromOklch} for engine color output; this helper preserves the legacy HSL output API.
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
    key = hdr
      ? `hsl-${color.h.toFixed(hslPrecision)}-${color.s.toFixed(hslPrecision)}-${color.l.toFixed(hslPrecision)}-hdr-${op.toString()}-${(peakNits ?? maxNits).toString()}-${mode ?? HdrMode.standard}`
      : `hsl-${color.h.toFixed(hslPrecision)}-${color.s.toFixed(hslPrecision)}-${color.l.toFixed(hslPrecision)}-sdr-${op.toString()}`;

  return getCachedStyle(key, () =>
    hdr
      ? getHdrStyleFromRgb(
          rgbToDisplayP3Float(hslToRgbFloat(color)),
          opacity,
          peakNits,
          mode,
        )
      : `hsla(${color.h.toString()}, ${color.s.toString()}%, ${color.l.toString()}%, ${op.toString()})`,
  );
}

/** Formats a canonical OKLCH color at the output boundary. */
export function getStyleFromOklch(
  color: IOklch | IOklcha,
  hdr: boolean,
  opacity?: number,
  peakNits?: number,
  mode?: HdrMode,
  outputColorSpace: PredefinedColorSpace = "srgb",
): string {
  const alpha =
      (opacity ?? defaultOpacity) * ("a" in color ? color.a : defaultAlpha),
    last = lastOklchStyle;

  if (
    last?.color.l === color.l &&
    last.color.c === color.c &&
    last.color.h === color.h &&
    last.alpha === alpha &&
    last.hdr === hdr &&
    last.mode === mode &&
    last.outputColorSpace === outputColorSpace &&
    last.peakNits === peakNits
  ) {
    return last.style;
  }

  const style = hdr
    ? getCachedOklchHdrStyle(color, alpha, peakNits, mode)
    : getCachedStyle(
        `oklch-css-${color.l}-${color.c}-${color.h}-${alpha}-${outputColorSpace}`,
        () => {
          const mappedColor =
            outputColorSpace === "display-p3"
              ? mapOklchToDisplayP3(color).color
              : mapOklchToSrgb(color).color;

          return `oklch(${mappedColor.l.toString()}% ${mappedColor.c.toString()} ${mappedColor.h.toString()} / ${alpha.toString()})`;
        },
      );

  if (last) {
    last.alpha = alpha;
    last.color.l = color.l;
    last.color.c = color.c;
    last.color.h = color.h;
    last.hdr = hdr;
    last.mode = mode;
    last.outputColorSpace = outputColorSpace;
    last.peakNits = peakNits;
    last.style = style;
  } else {
    lastOklchStyle = {
      alpha,
      color: { l: color.l, c: color.c, h: color.h },
      hdr,
      mode,
      outputColorSpace,
      peakNits,
      style,
    };
  }

  return style;
}

/** Mixes canonical colors in rectangular OKLab and returns canonical OKLCH. */
export function colorMixOklch(
  color1: IOklch | IOklcha,
  color2: IOklch | IOklcha,
  size1: number,
  size2: number,
): IOklcha {
  return mixOklch(color1, color2, size1, size2);
}

/**
 * Mixes two colors based on size proportions
 * @deprecated Use {@link colorMixOklch} for canonical engine color mixing.
 * @param color1 - the first color
 * @param color2 - the second color
 * @param size1 - the size of the first color
 * @param size2 - the size of the second color
 * @param hdr - whether to mix in linear space for HDR
 * @returns the mixed RGB color
 */
export function colorMix(
  color1: IRgb | IHsl,
  color2: IRgb | IHsl,
  size1: number,
  size2: number,
  hdr?: boolean,
): IRgb {
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
export function getLinkColor(
  p1: Particle,
  p2?: Particle,
  linkColor?: string | IRgb | IOklcha,
  _hdr?: boolean,
): IOklcha | undefined {
  if (linkColor === randomColorValue) {
    return {
      ...rgbToOklch(
        getRandomRgbColor(
          undefined,
          undefined,
          p1.container.engine.getRandomFn(),
        ),
      ),
      a: defaultAlpha,
    };
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),
      destColor = p2?.getFillColor() ?? p2?.getStrokeColor();

    if (sourceColor && destColor && p2) {
      return colorMixOklch(
        sourceColor,
        destColor,
        p1.getRadius(),
        p2.getRadius(),
      );
    } else {
      const oklchColor = sourceColor ?? destColor;

      if (oklchColor) {
        return oklchColor;
      }
    }
  } else {
    if (isString(linkColor)) {
      return rangeColorToOklch(p1.container.engine.pluginManager, linkColor);
    }

    if (linkColor && "r" in linkColor) {
      return { ...rgbToOklch(linkColor), a: defaultAlpha };
    }

    return linkColor;
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
): IOklcha | string | undefined {
  const color = isString(optColor) ? optColor : optColor.value;

  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToOklch(pluginManager, {
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
    return rangeColorToOklch(pluginManager, {
      value: color,
    });
  }
}

/** Gets the canonical OKLCH value from particle channel state. */
export function getOklchFromAnimation(
  animation?: IParticleOklchAnimation,
): IOklcha | undefined {
  return animation === undefined
    ? undefined
    : {
        a: animation.a,
        c: animation.c.value,
        h: animation.h.value,
        l: animation.l.value,
      };
}

/** Creates per-particle h/c/l state from a resolved color and animation options. */
export function getOklchAnimationFromOklch(
  oklch: IOklch | IOklcha,
  animationOptions: OklchAnimation | undefined,
  reduceFactor: number,
  random?: () => number,
): IParticleOklchAnimation {
  const result: IParticleOklchAnimation = {
    a: "a" in oklch ? oklch.a : defaultAlpha,
    c: { enable: false, value: oklch.c, min: 0, max: 0.4 },
    h: { enable: false, value: oklch.h, min: 0, max: 360 },
    l: { enable: false, value: oklch.l, min: 0, max: percentDenominator },
  };

  if (animationOptions) {
    setColorAnimation(result.h, animationOptions.h, reduceFactor, random);
    setColorAnimation(result.c, animationOptions.c, reduceFactor, random);
    setColorAnimation(result.l, animationOptions.l, reduceFactor, random);
  }

  return result;
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
  random?: () => number,
): void {
  colorValue.enable = colorAnimation.enable;
  colorValue.min = colorAnimation.min;
  colorValue.max = colorAnimation.max;

  if (colorValue.enable) {
    colorValue.velocity =
      getRangeValue(colorAnimation.speed, random) * reduceFactor;
    colorValue.decay =
      decayOffset - getRangeValue(colorAnimation.decay, random);
    colorValue.status = AnimationStatus.increasing;
    colorValue.loops = defaultLoops;
    colorValue.maxLoops = getRangeValue(colorAnimation.count, random);
    colorValue.time = defaultTime;
    colorValue.delayTime =
      getRangeValue(colorAnimation.delay, random) * millisecondsToSeconds;

    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom(random);
      colorValue.value *= getRandom(random);
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
 * @param _hdr - the HDR flag
 */
export function updateColorValue(
  data: IParticleColorAnimation,
  decrease: boolean,
  delta: IDelta,
  _hdr?: boolean,
  random?: () => number,
  wrap = false,
): void {
  const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minOffset = 0,
    velocityFactor = 1,
    maxLoops = data.maxLoops ?? minLoops,
    loops = data.loops ?? minLoops;

  if (
    !data.enable ||
    (maxLoops > minLoops && (wrap ? loops >= maxLoops : loops > maxLoops))
  ) {
    return;
  }

  data.time ??= 0;

  if (
    (data.delayTime ?? minDelay) > minDelay &&
    data.time < (data.delayTime ?? minDelay)
  ) {
    data.time += delta.value;
  }

  if (
    (data.delayTime ?? minDelay) > minDelay &&
    data.time < (data.delayTime ?? minDelay)
  ) {
    return;
  }

  const offset = data.offset
      ? randomInRangeValue(data.offset, random)
      : minOffset,
    velocity =
      (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor,
    decay = data.decay ?? identity,
    max = data.max,
    min = data.min;

  if (!decrease || data.status === AnimationStatus.increasing) {
    data.value += velocity;

    if (wrap && max > min && data.value >= max) {
      const range = max - min,
        loops = Math.max(1, Math.floor((data.value - min) / range));

      data.value = min + ((((data.value - min) % range) + range) % range);
      data.loops = (data.loops ?? 0) + loops;
    } else if (wrap && max > min && data.value < min) {
      const range = max - min,
        loops = Math.max(1, Math.ceil((min - data.value) / range));

      data.value = min + ((((data.value - min) % range) + range) % range);
      data.loops = (data.loops ?? 0) + loops;
    } else if (data.value > max) {
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
export function updateColor(
  color: IParticleOklchAnimation | undefined,
  delta: IDelta,
  hdr?: boolean,
  random?: () => number,
): void {
  if (!color) {
    return;
  }

  const { h, c, l } = color;

  updateColorValue(h, false, delta, hdr, random, true);
  updateColorValue(c, true, delta, hdr, random);
  updateColorValue(l, true, delta, hdr, random);
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

/** Alters OKLCH lightness while preserving chroma and hue. */
export function alterOklch(
  color: IOklch | IOklcha,
  type: AlterType,
  value: number,
): IOklcha {
  return {
    ...color,
    a: "a" in color ? color.a : defaultAlpha,
    l: clamp(
      color.l + (type === AlterType.darken ? -1 : 1) * value,
      none,
      percentDenominator,
    ),
  };
}
