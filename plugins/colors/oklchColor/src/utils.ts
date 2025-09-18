import {
    type ILch,
    type ILcha,
    type IOklch,
    type IOklcha,
    type IRgb,
    type IRgba,
    percentDenominator,
} from "@tsparticles/engine";

const rgbFactor = 255,
    fullDegree = 360;

/**
 * Converts an LCH ({@link ILch}) object into an RGB ({@link IRgb}) object
 * @param lch - the LCH object
 * @returns the {@link IRgb} object
 */
export function lchToRgb(lch: ILch): IRgb {
    // Similar conversion logic as OKLCH, but adapted for LCH
    const l = lch.l / percentDenominator,
        c = lch.c,
        h = lch.h / fullDegree,
        result: IRgb = { r: 0, g: 0, b: 0 };

    result.r = Math.floor(l * rgbFactor); // Example formula
    result.g = Math.floor(c * rgbFactor);
    result.b = Math.floor(h * rgbFactor);

    return result;
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
 * Converts an OKLCH ({@link IOklch}) object into an RGB ({@link IRgb}) object
 * @param oklch - the OKLCH ({@link IOklch}) object
 * @returns the {@link IRgb} object
 */
export function oklchToRgb(oklch: IOklch): IRgb {
    // Conversion logic from OKLCH to RGB (simplified, using a library is better for precision)
    // You might use a pre-existing function for accurate color space conversion, but here’s an approximation
    // Placeholder for conversion logic

    const l = oklch.l / percentDenominator, // Normalize lightness
        c = oklch.c / percentDenominator, // Normalize chroma
        h = oklch.h / fullDegree, // Normalize hue to 0-1
        // Simplified example of how to calculate rgb values based on l, c, h
        result: IRgb = { r: 0, g: 0, b: 0 };

    // Conversion would involve more accurate math and handling for out-of-gamut colors
    // Use l, c, h in a way that accurately converts to RGB

    result.r = Math.floor(l * rgbFactor); // This is a placeholder formula
    result.g = Math.floor(c * rgbFactor);
    result.b = Math.floor(h * rgbFactor);

    return result;
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
