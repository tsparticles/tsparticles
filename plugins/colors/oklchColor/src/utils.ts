import {
    type IOklch,
    type IOklcha,
    type IRgb,
    type IRgba,
    clamp,
    degToRad,
    percentDenominator,
} from "@tsparticles/engine";

const rgbFactor = 255,
    inverseNumerator = 1,
    OKLAB_LMS = {
        l: { L: 1, a: 0.3963377774, b: 0.2158037573 },
        m: { L: 1, a: -0.1055613458, b: -0.0638541728 },
        s: { L: 1, a: -0.0894841775, b: -1.291485548 },
    } as const,
    LMS_TO_LINEAR_RGB = {
        r: { l: 4.0767416621, m: -3.3077115913, s: 0.2309699292 },
        g: { l: -1.2684380046, m: 2.6097574011, s: -0.3413193965 },
        b: { l: -0.0041960863, m: -0.7034186147, s: 1.707614701 },
    } as const,
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
 * Converts an OKLCH ({@link IOklch}) object into an RGB ({@link IRgb}) object
 * @param oklch - the OKLCH ({@link IOklch}) object
 * @returns the {@link IRgb} object
 */
export function oklchToRgb(oklch: IOklch): IRgb {
    // 1. Normalize OKLCH
    const L = oklch.l / percentDenominator,
        C = oklch.c / percentDenominator,
        hRad = degToRad(oklch.h),
        // 2. OKLCH → OKLAB
        a = C * Math.cos(hRad),
        b = C * Math.sin(hRad),
        // 3. OKLAB → LMS (non-linear)
        l_ = OKLAB_LMS.l.L * L + OKLAB_LMS.l.a * a + OKLAB_LMS.l.b * b,
        m_ = OKLAB_LMS.m.L * L + OKLAB_LMS.m.a * a + OKLAB_LMS.m.b * b,
        s_ = OKLAB_LMS.s.L * L + OKLAB_LMS.s.a * a + OKLAB_LMS.s.b * b,
        // 4. Cubic response
        cubic = 3,
        l = l_ ** cubic,
        m = m_ ** cubic,
        s = s_ ** cubic,
        // 5. LMS → linear sRGB
        rLinear = LMS_TO_LINEAR_RGB.r.l * l + LMS_TO_LINEAR_RGB.r.m * m + LMS_TO_LINEAR_RGB.r.s * s,
        gLinear = LMS_TO_LINEAR_RGB.g.l * l + LMS_TO_LINEAR_RGB.g.m * m + LMS_TO_LINEAR_RGB.g.s * s,
        bLinear = LMS_TO_LINEAR_RGB.b.l * l + LMS_TO_LINEAR_RGB.b.m * m + LMS_TO_LINEAR_RGB.b.s * s,
        // 6. Linear → gamma-corrected sRGB
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
 * Converts an OKLCHA ({@link IOklcha}) object into an RGBA ({@link IRgba}) object
 * @param oklcha - the OKLCHA ({@link IOklcha}) object
 * @returns the {@link IRgba} object
 */
export function oklchaToRgba(oklcha: IOklcha): IRgba {
    return {
        a: oklcha.a,
        ...oklchToRgb(oklcha),
    };
}

/**
 * Gets a CSS style string from an OKLCH ({@link IOklch}) object and an optional opacity value
 * @param color - the OKLCH ({@link IOklch}) object
 * @param opacity - the opacity value
 * @returns the CSS style string
 */
export function getStyleFromOklch(color: IOklch, opacity?: number): string {
    const { l, c, h } = color,
        alpha = opacity !== undefined ? `, ${opacity.toString()}` : "";

    return `oklch(${l.toString()}%, ${c.toString()}%, ${h.toString()}°${alpha})`;
}
