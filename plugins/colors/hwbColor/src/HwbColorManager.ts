import {
    type IColor,
    type IColorManager,
    type IHwb,
    type IHwba,
    type IRangeColor,
    type IRgb,
    type IRgba,
    type IValueColor,
    getRangeValue,
    parseAlpha,
} from "@tsparticles/engine";

enum HwbIndexes {
    h = 1,
    w = 2,
    b = 3,
    a = 5,
}

const hwbRegex =
        /hwba?\(\s*(\d{1,3}(?:\.\d+)?(?:deg|rad|grad|turn)?)\s*[\s,]\s*(\d{1,3}(?:\.\d+)?)%\s*[\s,]\s*(\d{1,3}(?:\.\d+)?)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i,
    maxDegree = 360,
    maxPercentage = 100,
    maxHwbValue = 255,
    hueSectors = 6,
    redOffset = 5,
    greenOffset = 3,
    blueOffset = 1,
    clampingMin = 0,
    clampingMax = 1,
    clampingReference = 4,
    unitValue = 1,
    defaultFallbackValue = 0;

/**
 * Converts an HWB color value to RGB. Conversion formula
 * @param hwb - The HWB object
 * @returns The RGB representation
 */
function hwbToRgb(hwb: IHwb): IRgb {
    const normalizedHue = hwb.h / maxDegree,
        whiteness = hwb.w / maxPercentage,
        blackness = hwb.b / maxPercentage,
        totalWhitenessBlackness = whiteness + blackness;

    let red: number, green: number, blue: number;

    if (totalWhitenessBlackness >= unitValue) {
        const greyShade = whiteness / totalWhitenessBlackness;

        red = greyShade;
        green = greyShade;
        blue = greyShade;
    } else {
        const calculateChannel = (channelOffset: number): number => {
            const sectorPosition = (channelOffset + normalizedHue * hueSectors) % hueSectors,
                availableChroma = unitValue - whiteness - blackness,
                intensityFactor = Math.max(
                    clampingMin,
                    Math.min(sectorPosition, clampingReference - sectorPosition, clampingMax),
                );

            return unitValue - blackness - availableChroma * intensityFactor;
        };

        red = calculateChannel(redOffset);
        green = calculateChannel(greenOffset);
        blue = calculateChannel(blueOffset);
    }

    return {
        r: Math.round(red * maxHwbValue),
        g: Math.round(green * maxHwbValue),
        b: Math.round(blue * maxHwbValue),
    };
}

/**
 * Converts an HWB color value and alpha transparency value to RGBA. Conversion formula
 * @param hwba -
 * @returns The RGBA representation
 */
function hwbaToRgba(hwba: IHwba): IRgba {
    return {
        a: hwba.a,
        ...hwbToRgb(hwba),
    };
}

export class HwbColorManager implements IColorManager {
    readonly key;

    constructor() {
        this.key = "hwb";
    }

    accepts(input: string): boolean {
        return input.startsWith("hwb");
    }

    handleColor(color: IColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

        if (!Object.hasOwn(hwbColor, "h")) {
            return;
        }

        return hwbToRgb(hwbColor);
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        const colorValue = color.value as IValueColor,
            hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

        if (!Object.hasOwn(hwbColor, "h")) {
            return;
        }

        return hwbToRgb({
            h: getRangeValue(hwbColor.h),
            w: getRangeValue(hwbColor.w),
            b: getRangeValue(hwbColor.b),
        });
    }

    parseString(input: string): IRgba | undefined {
        if (!this.accepts(input)) {
            return;
        }

        const result = hwbRegex.exec(input),
            minLength = 4,
            defaultAlpha = 1;

        if (!result) {
            return;
        }

        const h = result[HwbIndexes.h],
            w = result[HwbIndexes.w],
            b = result[HwbIndexes.b];

        return hwbaToRgba({
            a: result.length > minLength ? parseAlpha(result[HwbIndexes.a]) : defaultAlpha,
            h: h !== undefined ? parseFloat(h) : defaultFallbackValue,
            w: w !== undefined ? parseFloat(w) : defaultFallbackValue,
            b: b !== undefined ? parseFloat(b) : defaultFallbackValue,
        });
    }
}
