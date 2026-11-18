/* eslint-disable @typescript-eslint/no-magic-numbers -- fixed CSS Color 4 OKLab/sRGB coefficients */
import type { ILab, ILch, IOklch, IOklcha, IRgb } from "../Core/Interfaces/Colors.js";

const achromaticThreshold = 1e-7,
  rgbScale = 255,
  degreesPerRadian = 180 / Math.PI,
  radiansPerDegree = Math.PI / 180;

/** Converts an sRGB channel to linear light. The input is in the 0–255 range. */
function srgbToLinear(value: number): number {
  const channel = value / rgbScale;

  return Math.abs(channel) <= 0.04045
    ? channel / 12.92
    : Math.sign(channel) * ((Math.abs(channel) + 0.055) / 1.055) ** 2.4;
}

/** Converts a linear sRGB channel to its encoded form in the 0–255 range. */
function linearToSrgb(value: number): number {
  const channel =
    Math.abs(value) <= 0.0031308 ? 12.92 * value : Math.sign(value) * (1.055 * Math.abs(value) ** (1 / 2.4) - 0.055);

  return channel * rgbScale;
}

/** Converts an sRGB color to OKLCH without quantizing intermediate values. */
export function rgbToOklch(color: IRgb): IOklch {
  const r = srgbToLinear(color.r),
    g = srgbToLinear(color.g),
    b = srgbToLinear(color.b),
    l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b),
    m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b),
    s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b),
    lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    chroma = Math.hypot(a, bAxis);

  return {
    c: chroma,
    h: chroma < achromaticThreshold ? 0 : (Math.atan2(bAxis, a) * degreesPerRadian + 360) % 360,
    l: lightness * 100,
  };
}

/** Converts CSS CIELAB (D50) directly to OKLCH (D65), without an sRGB round trip. */
export function labToOklch(color: ILab): IOklch {
  const fy = (color.l + 16) / 116,
    fx = fy + color.aAxis / 500,
    fz = fy - color.bAxis / 200,
    epsilon = 216 / 24389,
    kappa = 24389 / 27,
    xr = fx ** 3 > epsilon ? fx ** 3 : (116 * fx - 16) / kappa,
    yr = color.l > kappa * epsilon ? fy ** 3 : color.l / kappa,
    zr = fz ** 3 > epsilon ? fz ** 3 : (116 * fz - 16) / kappa,
    x50 = xr * 0.96422,
    y50 = yr,
    z50 = zr * 0.82521,
    x = 0.955473421488075 * x50 - 0.02309845494876471 * y50 + 0.06325924320057072 * z50,
    y = -0.0283697093338637 * x50 + 1.0099953980813041 * y50 + 0.021041441191917323 * z50,
    z = 0.012314014864481998 * x50 - 0.020507649298898964 * y50 + 1.330365926242124 * z50,
    l = Math.cbrt(0.819022437996703 * x + 0.3619062600528904 * y - 0.1288737815209879 * z),
    m = Math.cbrt(0.0329836539323885 * x + 0.9292868615863434 * y + 0.0361446663506424 * z),
    s = Math.cbrt(0.0481771893596242 * x + 0.2642395317527308 * y + 0.6335478284694309 * z),
    lightness = 0.210454268309314 * l + 0.7936177747023054 * m - 0.0040720430116193 * s,
    a = 1.9779985324311684 * l - 2.4285922420485799 * m + 0.450593709617411 * s,
    b = 0.0259040424655478 * l + 0.7827717124575296 * m - 0.8086757549230774 * s,
    chroma = Math.hypot(a, b);

  return {
    c: chroma,
    h: chroma < achromaticThreshold ? 0 : (Math.atan2(b, a) * degreesPerRadian + 360) % 360,
    l: lightness * 100,
  };
}

/** Converts CSS CIELCH (D50) directly to OKLCH (D65), without an sRGB round trip. */
export function lchToOklch(color: ILch): IOklch {
  const angle = color.h * radiansPerDegree;

  return labToOklch({ aAxis: color.c * Math.cos(angle), bAxis: color.c * Math.sin(angle), l: color.l });
}

/** Converts Display-P3 encoded channels to OKLCH through linear-light sRGB. */
export function displayP3ToOklch(color: IRgb): IOklch {
  const r = srgbToLinear(color.r),
    g = srgbToLinear(color.g),
    b = srgbToLinear(color.b),
    linearSrgb = {
      r: 1.22494017628056 * r - 0.22494017628056 * g,
      g: -0.04205695470969 * r + 1.04205695470969 * g,
      b: -0.0196375545903344 * r - 0.0786360455506319 * g + 1.09827360014097 * b,
    };

  return rgbToOklch({
    b: linearToSrgb(linearSrgb.b),
    g: linearToSrgb(linearSrgb.g),
    r: linearToSrgb(linearSrgb.r),
  });
}

/** Converts OKLCH to extended sRGB coordinates in the 0–255 range, without gamut mapping. */
export function oklchToRgbFloat(color: IOklch): IRgb {
  const angle = color.h * radiansPerDegree,
    a = color.c * Math.cos(angle),
    b = color.c * Math.sin(angle),
    normalizedLightness = color.l / 100,
    l = normalizedLightness + 0.3963377774 * a + 0.2158037573 * b,
    m = normalizedLightness - 0.1055613458 * a - 0.0638541728 * b,
    s = normalizedLightness - 0.0894841775 * a - 1.291485548 * b,
    l3 = l ** 3,
    m3 = m ** 3,
    s3 = s ** 3;

  return {
    b: linearToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
    g: linearToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
    r: linearToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
  };
}

/** Maps OKLCH to sRGB by reducing chroma at constant lightness and hue. */
export function mapOklchToSrgb(color: IOklch): { color: IOklch; rgb: IRgb } {
  const lightness = Math.min(100, Math.max(0, color.l)),
    candidate = { ...color, l: lightness },
    candidateRgb = oklchToRgbFloat(candidate),
    inGamut = (rgb: IRgb): boolean =>
      rgb.r >= 0 && rgb.r <= rgbScale && rgb.g >= 0 && rgb.g <= rgbScale && rgb.b >= 0 && rgb.b <= rgbScale;

  if (inGamut(candidateRgb)) {
    return { color: candidate, rgb: candidateRgb };
  }

  let low = 0,
    high = candidate.c,
    mapped = { ...candidate, c: 0 };

  for (let iteration = 0; iteration < 24; iteration++) {
    const chroma = (low + high) / 2,
      probe = { ...candidate, c: chroma },
      probeRgb = oklchToRgbFloat(probe);

    if (inGamut(probeRgb)) {
      low = chroma;
      mapped = probe;
    } else {
      high = chroma;
    }
  }

  return { color: mapped, rgb: oklchToRgbFloat(mapped) };
}

/** Converts OKLCH to floating-point Display-P3 channels without gamut mapping. */
export function oklchToDisplayP3Float(color: IOklch): IRgb {
  const srgb = oklchToRgbFloat(color),
    r = srgbToLinear(srgb.r),
    g = srgbToLinear(srgb.g),
    b = srgbToLinear(srgb.b),
    p3R = 0.82259287 * r + 0.17753395 * g,
    p3G = 0.03319951 * r + 0.9667835 * g,
    p3B = 0.01708535 * r + 0.07239572 * g + 0.91030148 * b;

  return {
    b: linearToSrgb(p3B),
    g: linearToSrgb(p3G),
    r: linearToSrgb(p3R),
  };
}

/** Maps OKLCH to Display-P3 by reducing chroma at constant lightness and hue. */
export function mapOklchToDisplayP3(color: IOklch): { color: IOklch; rgb: IRgb } {
  const lightness = Math.min(100, Math.max(0, color.l)),
    candidate = { ...color, l: lightness },
    candidateRgb = oklchToDisplayP3Float(candidate),
    inGamut = (rgb: IRgb): boolean =>
      rgb.r >= 0 && rgb.r <= rgbScale && rgb.g >= 0 && rgb.g <= rgbScale && rgb.b >= 0 && rgb.b <= rgbScale;

  if (inGamut(candidateRgb)) {
    return { color: candidate, rgb: candidateRgb };
  }

  let low = 0,
    high = candidate.c,
    mapped = { ...candidate, c: 0 };

  for (let iteration = 0; iteration < 24; iteration++) {
    const chroma = (low + high) / 2,
      probe = { ...candidate, c: chroma },
      probeRgb = oklchToDisplayP3Float(probe);

    if (inGamut(probeRgb)) {
      low = chroma;
      mapped = probe;
    } else {
      high = chroma;
    }
  }

  return { color: mapped, rgb: oklchToDisplayP3Float(mapped) };
}

/** Mixes two colors by interpolating their rectangular OKLab coordinates. */
export function mixOklch(
  color1: IOklch | IOklcha,
  color2: IOklch | IOklcha,
  weight1: number,
  weight2: number,
): IOklcha {
  const totalWeight = weight1 + weight2,
    firstWeight = totalWeight > 0 ? weight1 / totalWeight : 0.5,
    secondWeight = totalWeight > 0 ? weight2 / totalWeight : 0.5,
    firstAngle = color1.h * radiansPerDegree,
    secondAngle = color2.h * radiansPerDegree,
    a = color1.c * Math.cos(firstAngle) * firstWeight + color2.c * Math.cos(secondAngle) * secondWeight,
    b = color1.c * Math.sin(firstAngle) * firstWeight + color2.c * Math.sin(secondAngle) * secondWeight,
    chroma = Math.hypot(a, b);

  return {
    a: ("a" in color1 ? color1.a : 1) * firstWeight + ("a" in color2 ? color2.a : 1) * secondWeight,
    c: chroma,
    h: chroma < achromaticThreshold ? 0 : (Math.atan2(b, a) * degreesPerRadian + 360) % 360,
    l: color1.l * firstWeight + color2.l * secondWeight,
  };
}

/** Returns an OKLCH color with a wrapped hue and finite channels. */
export function normalizeOklch(color: IOklch): IOklch | undefined {
  if (![color.l, color.c, color.h].every(Number.isFinite) || color.c < 0) {
    return;
  }

  return { c: color.c, h: ((color.h % 360) + 360) % 360, l: color.l };
}
