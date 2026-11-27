/* eslint-disable @typescript-eslint/no-magic-numbers -- fixed CSS Color 4 Bradford adaptation coefficients */
import {
  type ILch,
  type ILcha,
  type IRgb,
  type IRgba,
  clamp,
  degToRad,
  inverseFactorNumerator,
} from "@tsparticles/engine";

// RGB
const RGB = {
    MAX: 255,
  } as const,
  // CSS Lab reference white (D50, 2°)
  WHITE_POINT_D50 = {
    X: 0.96422,
    Y: 1.0,
    Z: 0.82521,
  } as const,
  // CIE LAB constants
  CIE = {
    LAB_EPSILON_NUMERATOR: 216,
    LAB_EPSILON_DENOMINATOR: 24389,
    LAB_KAPPA_NUMERATOR: 24389,
    LAB_KAPPA_DENOMINATOR: 27,
    LAB_L_OFFSET: 16,
    LAB_L_SCALE: 116,
    LAB_A_SCALE: 500,
    LAB_B_SCALE: 200,
  } as const,
  LAB = {
    EPSILON: CIE.LAB_EPSILON_NUMERATOR / CIE.LAB_EPSILON_DENOMINATOR,
    KAPPA: CIE.LAB_KAPPA_NUMERATOR / CIE.LAB_KAPPA_DENOMINATOR,
    L_OFFSET: CIE.LAB_L_OFFSET,
    L_SCALE: CIE.LAB_L_SCALE,
    A_SCALE: CIE.LAB_A_SCALE,
    B_SCALE: CIE.LAB_B_SCALE,
  } as const,
  // XYZ → linear sRGB matrix
  XYZ_TO_LINEAR_RGB = {
    r: { x: 3.2404542, y: -1.5371385, z: -0.4985314 },
    g: { x: -0.969266, y: 1.8760108, z: 0.041556 },
    b: { x: 0.0556434, y: -0.2040259, z: 1.0572252 },
  } as const,
  // sRGB transfer function
  SRGB = {
    GAMMA: 2.4,
    LINEAR_THRESHOLD: 0.0031308,
    LINEAR_SCALE: 12.92,
    SCALE: 1.055,
    OFFSET: 0.055,
  } as const,
  minSrgbValue = 0,
  maxSrgbValue = 1;

/**
 * Converts an LCH ({@link ILch}) object into an RGB ({@link IRgb}) object
 * @param lch - the LCH object
 * @returns the {@link IRgb} object
 */
export function lchToRgbFloat(lch: ILch): IRgb {
  // 1. LCH → LAB
  const L = lch.l, // 0–100
    C = lch.c,
    hRad = degToRad(lch.h),
    a = C * Math.cos(hRad),
    b = C * Math.sin(hRad),
    // 2. LAB → XYZ (relative)
    fy = (L + LAB.L_OFFSET) / LAB.L_SCALE,
    fx = fy + a / LAB.A_SCALE,
    fz = fy - b / LAB.B_SCALE,
    cubic = 3,
    fx3 = fx ** cubic,
    fz3 = fz ** cubic,
    xr = fx3 > LAB.EPSILON ? fx3 : (LAB.L_SCALE * fx - LAB.L_OFFSET) / LAB.KAPPA,
    yr = L > LAB.KAPPA * LAB.EPSILON ? fy ** cubic : L / LAB.KAPPA,
    zr = fz3 > LAB.EPSILON ? fz3 : (LAB.L_SCALE * fz - LAB.L_OFFSET) / LAB.KAPPA,
    x50 = xr * WHITE_POINT_D50.X,
    y50 = yr * WHITE_POINT_D50.Y,
    z50 = zr * WHITE_POINT_D50.Z,
    // Bradford adaptation from CSS Lab D50 to sRGB D65.
    X = 0.955473421488075 * x50 - 0.02309845494876471 * y50 + 0.06325924320057072 * z50,
    Y = -0.0283697093338637 * x50 + 1.0099953980813041 * y50 + 0.021041441191917323 * z50,
    Z = 0.012314014864481998 * x50 - 0.020507649298898964 * y50 + 1.330365926242124 * z50,
    // 3. XYZ → linear sRGB
    rLinear = XYZ_TO_LINEAR_RGB.r.x * X + XYZ_TO_LINEAR_RGB.r.y * Y + XYZ_TO_LINEAR_RGB.r.z * Z,
    gLinear = XYZ_TO_LINEAR_RGB.g.x * X + XYZ_TO_LINEAR_RGB.g.y * Y + XYZ_TO_LINEAR_RGB.g.z * Z,
    bLinear = XYZ_TO_LINEAR_RGB.b.x * X + XYZ_TO_LINEAR_RGB.b.y * Y + XYZ_TO_LINEAR_RGB.b.z * Z,
    // 4. Linear → gamma-corrected sRGB
    toSrgb = (x: number): number =>
      x <= SRGB.LINEAR_THRESHOLD
        ? SRGB.LINEAR_SCALE * x
        : SRGB.SCALE * Math.pow(x, inverseFactorNumerator / SRGB.GAMMA) - SRGB.OFFSET,
    toSrgbFloat: (num: number) => number = num => toSrgb(num) * RGB.MAX;

  return {
    r: toSrgbFloat(rLinear),
    g: toSrgbFloat(gLinear),
    b: toSrgbFloat(bLinear),
  };
}

/** Converts CIELCH to the legacy clamped, integer RGB representation. */
export function lchToRgb(lch: ILch): IRgb {
  const color = lchToRgbFloat(lch);

  return {
    r: Math.round(clamp(color.r, minSrgbValue * RGB.MAX, maxSrgbValue * RGB.MAX)),
    g: Math.round(clamp(color.g, minSrgbValue * RGB.MAX, maxSrgbValue * RGB.MAX)),
    b: Math.round(clamp(color.b, minSrgbValue * RGB.MAX, maxSrgbValue * RGB.MAX)),
  };
}

/**
 * Converts an LCHA ({@link ILcha}) object into an RGBA ({@link IRgba}) object
 * @param lcha - the LCHA object
 * @returns the {@link IRgba} object
 */
export function lchaToRgba(lcha: ILcha): IRgba {
  return {
    a: lcha.a,
    ...lchToRgb(lcha),
  };
}

/**
 * Gets a CSS style string from an LCH ({@link ILch}) object and an optional opacity value
 * @param color - the LCH ({@link ILch}) object
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromLch(color: ILch, opacity?: number): string {
  const { l, c, h } = color,
    alpha = opacity !== undefined ? `/ ${opacity.toString()}` : "";

  return `lch(${l.toString()}%, ${c.toString()}%, ${h.toString()}°${alpha})`;
}
