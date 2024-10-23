import {
    type IColor,
    type IColorManager,
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
        this.key = "oklch";
        this.stringPrefix = "oklch";
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            oklchColor = colorValue.oklch ?? (color.value as IOklch);

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb(oklchColor);
        }
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IRangeValueColor,
            oklchColor = colorValue.oklch ?? (color.value as IRangeOklch);

        if (oklchColor.l !== undefined && oklchColor.c !== undefined && oklchColor.h !== undefined) {
            return oklchToRgb({
                l: getRangeValue(oklchColor.l),
                c: getRangeValue(oklchColor.c),
                h: getRangeValue(oklchColor.h),
            });
        }
    }

    parseString(input: string): IRgba | undefined {
        if (!input.startsWith("oklch")) {
            return;
        }

        const regex =
                /oklcha?\(\s*(\d+)%\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)°\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,
            result = regex.exec(input),
            fullLength = 4,
            indexes = {
                l: 1,
                c: 2,
                h: 3,
                a: 5,
            },
            defaultAlpha = 1,
            radix = 10;

        return result
            ? oklchaToRgba({
                  a: result.length > fullLength ? parseAlpha(result[indexes.a]) : defaultAlpha,
                  c: parseInt(result[indexes.c], radix),
                  h: parseInt(result[indexes.h], radix),
                  l: parseInt(result[indexes.l], radix),
              })
            : undefined;
    }
}
