import { type IOklab, type IOklaba, type IRgb, type IRgba, clamp, percentDenominator } from "@tsparticles/engine";

const rgbFactor = 255,
    inverseNumerator = 1,
    // OKLab → LMS (non-linear)
    OKLAB_LMS = {
        l: { L: 1, a: 0.3963377774, b: 0.2158037573 },
        m: { L: 1, a: -0.1055613458, b: -0.0638541728 },
        s: { L: 1, a: -0.0894841775, b: -1.291485548 },
    } as const,
    // LMS → linear sRGB
    LMS_TO_LINEAR_RGB = {
        r: { l: 4.0767416621, m: -3.3077115913, s: 0.2309699292 },
        g: { l: -1.2684380046, m: 2.6097574011, s: -0.3413193965 },
        b: { l: -0.0041960863, m: -0.7034186147, s: 1.707614701 },
    } as const,
    // sRGB transfer function
    SRGB = {
        GAMMA: 2.4,
        LINEAR_THRESHOLD: 0.0031308,
        LINEAR_SCALE: 12.92,
        OFFSET: 0.055,
        SCALE: 1.055,
    } as const,
    minSrgbValue = 0,
    maxSrgbValue = 1;

/**
 * Converts an OKLAB ({@link IOklab}) object into an RGB ({@link IRgb}) object
 * @param oklab - the OKLAB ({@link IOklab}) object
 * @returns the {@link IRgb} object
 */
export function oklabToRgb(oklab: IOklab): IRgb {
    // 1. Normalize OKLab inputs
    const L = oklab.l / percentDenominator,
        a = oklab.aAxis,
        b = oklab.bAxis,
        // 2. OKLab → LMS (non-linear)
        l_ = OKLAB_LMS.l.L * L + OKLAB_LMS.l.a * a + OKLAB_LMS.l.b * b,
        m_ = OKLAB_LMS.m.L * L + OKLAB_LMS.m.a * a + OKLAB_LMS.m.b * b,
        s_ = OKLAB_LMS.s.L * L + OKLAB_LMS.s.a * a + OKLAB_LMS.s.b * b,
        cubic = 3,
        // 3. Cubic response
        l = l_ ** cubic,
        m = m_ ** cubic,
        s = s_ ** cubic,
        // 4. LMS → linear sRGB
        rLinear = LMS_TO_LINEAR_RGB.r.l * l + LMS_TO_LINEAR_RGB.r.m * m + LMS_TO_LINEAR_RGB.r.s * s,
        gLinear = LMS_TO_LINEAR_RGB.g.l * l + LMS_TO_LINEAR_RGB.g.m * m + LMS_TO_LINEAR_RGB.g.s * s,
        bLinear = LMS_TO_LINEAR_RGB.b.l * l + LMS_TO_LINEAR_RGB.b.m * m + LMS_TO_LINEAR_RGB.b.s * s,
        // 5. Linear → gamma-corrected sRGB
        toSrgb = (x: number): number =>
            x <= SRGB.LINEAR_THRESHOLD
                ? SRGB.LINEAR_SCALE * x
                : SRGB.SCALE * Math.pow(x, inverseNumerator / SRGB.GAMMA) - SRGB.OFFSET,
        toSrgbFixed: (num: number) => number = num =>
            Math.round(clamp(toSrgb(num), minSrgbValue, maxSrgbValue) * rgbFactor);

    return {
        r: toSrgbFixed(rLinear),
        g: toSrgbFixed(gLinear),
        b: toSrgbFixed(bLinear),
    };
}

/**
 * Converts an OKLABA ({@link IOklaba}) object into an RGBA ({@link IRgba}) object
 * @param oklaba - the OKLABA ({@link IOklaba}) object
 * @returns the {@link IRgba} object
 */
export function oklabaToRgba(oklaba: IOklaba): IRgba {
    return {
        a: oklaba.a,
        ...oklabToRgb(oklaba),
    };
}

/**
 * Gets a CSS style string from an OKLAB ({@link IOklab}) object and an optional opacity value
 * @param color - the OKLAB ({@link IOklab}) object
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromOklab(color: IOklab, opacity?: number): string {
    const { l, aAxis, bAxis } = color,
        alpha = opacity !== undefined ? ` / ${opacity.toString()}` : "";

    return `oklab(${l.toString()}% ${aAxis.toString()} ${bAxis.toString()}${alpha})`;
}
