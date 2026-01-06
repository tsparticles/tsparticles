import { type ILab, type ILaba, type IRgb, type IRgba, clamp, inverseFactorNumerator } from "@tsparticles/engine";

// RGB
const RGB = {
        MAX: 255,
    } as const,
    // Reference white (D65, 2°)
    WHITE_POINT_D65 = {
        X: 0.95047,
        Y: 1.0,
        Z: 1.08883,
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
 * Converts an LAB ({@link ILab}) object into an RGB ({@link IRgb}) object
 * @param lab - the LAB object
 * @returns the {@link IRgb} object
 */
export function labToRgb(lab: ILab): IRgb {
    // 1. LAB → LAB
    const L = lab.l, // 0–100
        a = lab.aAxis,
        b = lab.bAxis,
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
        X = xr * WHITE_POINT_D65.X,
        Y = yr * WHITE_POINT_D65.Y,
        Z = zr * WHITE_POINT_D65.Z,
        // 3. XYZ → linear sRGB
        rLinear = XYZ_TO_LINEAR_RGB.r.x * X + XYZ_TO_LINEAR_RGB.r.y * Y + XYZ_TO_LINEAR_RGB.r.z * Z,
        gLinear = XYZ_TO_LINEAR_RGB.g.x * X + XYZ_TO_LINEAR_RGB.g.y * Y + XYZ_TO_LINEAR_RGB.g.z * Z,
        bLinear = XYZ_TO_LINEAR_RGB.b.x * X + XYZ_TO_LINEAR_RGB.b.y * Y + XYZ_TO_LINEAR_RGB.b.z * Z,
        // 4. Linear → gamma-corrected sRGB
        toSrgb = (x: number): number =>
            x <= SRGB.LINEAR_THRESHOLD
                ? SRGB.LINEAR_SCALE * x
                : SRGB.SCALE * Math.pow(x, inverseFactorNumerator / SRGB.GAMMA) - SRGB.OFFSET,
        toSrgbFixed: (num: number) => number = num =>
            Math.round(clamp(toSrgb(num), minSrgbValue, maxSrgbValue) * RGB.MAX);

    return {
        r: toSrgbFixed(rLinear),
        g: toSrgbFixed(gLinear),
        b: toSrgbFixed(bLinear),
    };
}

/**
 * Converts an LABA ({@link ILaba}) object into an RGBA ({@link IRgba}) object
 * @param laba - the LABA object
 * @returns the {@link IRgba} object
 */
export function labaToRgba(laba: ILaba): IRgba {
    return {
        a: laba.a,
        ...labToRgb(laba),
    };
}

/**
 * Gets a CSS style string from an LAB ({@link ILab}) object and an optional opacity value
 * @param color - the LAB ({@link ILab}) object
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromLab(color: ILab, opacity?: number): string {
    const { l, aAxis, bAxis } = color,
        alpha = opacity !== undefined ? `/ ${opacity.toString()}` : "";

    return `lab(${l.toString()}%, ${aAxis.toString()}%, ${bAxis.toString()}°${alpha})`;
}
