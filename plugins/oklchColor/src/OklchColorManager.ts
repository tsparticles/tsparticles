import {
    type IColor,
    type IColorManager,
    type ILch,
    type ILcha,
    type IOklch,
    type IOklcha,
    type IRangeColor,
    type IRangeOklch,
    type IRangeValueColor,
    type IRgb,
    type IRgba,
    type IValueColor,
    getRangeValue,
    parseAlpha,
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
        alpha = opacity !== undefined ? `, ${opacity}` : "";

    return `oklch(${l}%, ${c}%, ${h}°${alpha})`;
}

export class OklchColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "color"; // Generic key for both OKLCH and LCH
        this.stringPrefix = "oklch"; // Default to OKLCH
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor;
        const oklchColor = colorValue.oklch ?? (color.value as IOklch);
        const lchColor = colorValue.lch ?? (color.value as IOklch); // Support for LCH

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb(oklchColor);
        } else if (lchColor.l !== undefined && lchColor.c !== undefined && lchColor.h !== undefined) {
            return lchToRgb(lchColor); // Handle LCH conversion
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor;
        const oklchColor = colorValue.oklch ?? (color.value as IRangeOklch);
        const lchColor = colorValue.lch ?? (color.value as IRangeOklch); // Support for LCH

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb({
                l: getRangeValue(oklchColor.l),
                c: getRangeValue(oklchColor.c),
                h: getRangeValue(oklchColor.h),
            });
        } else if (lchColor.l !== undefined && lchColor.c !== undefined && lchColor.h !== undefined) {
            return lchToRgb({
                l: getRangeValue(lchColor.l),
                c: getRangeValue(lchColor.c),
                h: getRangeValue(lchColor.h),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        const isOklch = input.startsWith("oklch"),
            isLch = input.startsWith("lch");

        if (!isOklch && !isLch) {
            return;
        }

        // Adjust regex for both LCH and OKLCH
        const regex = isOklch
            ? /oklch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(°)?(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i
            : /lch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

        const result = regex.exec(input),
            indexes = {
                l: 1, // Lightness
                c: 3, // Chroma
                h: 5, // Hue
                a: 7, // Optional alpha for OKLCH
            },
            defaultAlpha = 1;

        if (!result) {
            return;
        }

        return isOklch
            ? oklchaToRgba({
                  a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseFloat(result[indexes.c]), // Chroma
                  h: parseFloat(result[indexes.h]), // Hue
                  l: parseFloat(result[indexes.l]), // Lightness
              })
            : lchaToRgba({
                  a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseFloat(result[indexes.c]),
                  h: parseFloat(result[indexes.h]),
                  l: parseFloat(result[indexes.l]),
              }); // LCH parsing without alpha
    }
}

export class LchColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "color"; // Generic key for both LCH and LCH
        this.stringPrefix = "lch"; // Default to LCH
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor;
        const lchColor = colorValue.lch ?? (color.value as ILch);

        if (lchColor.l !== undefined && lchColor.c !== undefined && lchColor.h !== undefined) {
            return lchToRgb(lchColor); // Handle LCH conversion
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor;
        const lchColor = colorValue.lch ?? (color.value as IRangeOklch); // Support for LCH

        if (lchColor.l !== undefined && lchColor.c !== undefined && lchColor.h !== undefined) {
            return lchToRgb({
                l: getRangeValue(lchColor.l),
                c: getRangeValue(lchColor.c),
                h: getRangeValue(lchColor.h),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        const isLch = input.startsWith("lch");

        if (!isLch) {
            return;
        }

        // Adjust regex for both LCH and OKLCH
        const regex = /lch\(\s*(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)(?:\s*\/\s*(0|1|0?\.\d+|\d{1,3}%))?\s*\)/i;

        const result = regex.exec(input),
            indexes = {
                l: 1, // Lightness
                c: 3, // Chroma
                h: 5, // Hue
                a: 7, // Optional alpha for LCH
            },
            defaultAlpha = 1;

        return result
            ? lchaToRgba({
                  a: result[indexes.a] ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseFloat(result[indexes.c]),
                  h: parseFloat(result[indexes.h]),
                  l: parseFloat(result[indexes.l]),
              })
            : undefined; // LCH parsing without alpha
    }
}
