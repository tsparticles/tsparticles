import type { IColor, IColorManager, IRangeColor, IRgb, IRgba } from "@tsparticles/engine";

/**
 * Indexes for accessing color components from regex capture groups.
 * Uses 1-based indexing as index 0 contains the full match.
 */
enum RgbIndexes {
    r = 1,
    g = 2,
    b = 3,
    a = 4,
}

const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
    hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
    hexRadix = 16,
    defaultAlpha = 1,
    alphaFactor = 0xff;

/**
 * Manages hexadecimal color string parsing and conversion to RGB/RGBA format.
 * Implements the IColorManager interface for handling hex color values.
 */
export class HexColorManager implements IColorManager {
    readonly key;
    readonly stringPrefix;

    constructor() {
        this.key = "hex";
        this.stringPrefix = "#";
    }

    handleColor(color: IColor): IRgb | undefined {
        return this._parseString(color.value);
    }

    handleRangeColor(color: IRangeColor): IRgb | undefined {
        return this._parseString(color.value);
    }

    parseString(input: string): IRgba | undefined {
        return this._parseString(input);
    }

    private _parseString(hexColor: unknown): IRgba | undefined {
        if (typeof hexColor !== "string") {
            return;
        }

        if (!hexColor.startsWith(this.stringPrefix)) {
            return;
        }

        const hexFixed = hexColor.replace(shorthandHexRegex, (_, r: string, g: string, b: string, a?: string) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            }),
            result = hexRegex.exec(hexFixed);

        return result
            ? {
                  a: result[RgbIndexes.a] ? parseInt(result[RgbIndexes.a], hexRadix) / alphaFactor : defaultAlpha,
                  b: parseInt(result[RgbIndexes.b] ?? "0", hexRadix),
                  g: parseInt(result[RgbIndexes.g] ?? "0", hexRadix),
                  r: parseInt(result[RgbIndexes.r] ?? "0", hexRadix),
              }
            : undefined;
    }
}
