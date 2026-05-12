import type { IColor, IColorManager, IRangeColor, IRgb, IRgba } from "@tsparticles/engine";

/**
 * Indexes for accessing color components from regex capture groups.
 * Uses 1-based indexing as index 0 contains the full match.
 */
/** Indexes for RGB regex capture groups */
enum RgbIndexes {
  /** Red component index */
  r = 1,
  /** Green component index */
  g = 2,
  /** Blue component index */
  b = 3,
  /** Alpha component index */
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
/** Hexadecimal color manager */
export class HexColorManager implements IColorManager {
  /**
   * Checks if the input starts with #
   * @param input
   */
  accepts(input: string): boolean {
    return input.startsWith("#");
  }

  /**
   * Converts an IColor to RGB
   * @param color
   */
  handleColor(color: IColor): IRgb | undefined {
    return this._parseString(color.value);
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    return this._parseString(color.value);
  }

  /**
   * Parses a hex color string to RGBA
   * @param input
   */
  parseString(input: string): IRgba | undefined {
    return this._parseString(input);
  }

  private _parseString(hexColor: unknown): IRgba | undefined {
    if (typeof hexColor !== "string" || !this.accepts(hexColor)) {
      return;
    }

    const hexFixed = hexColor.replace(shorthandHexRegex, (_, r: string, g: string, b: string, a?: string) => {
        return r + r + g + g + b + b + (a === undefined ? "" : a + a);
      }),
      result = hexRegex.exec(hexFixed);

    return result
      ? {
          a: result[RgbIndexes.a] ? Number.parseInt(result[RgbIndexes.a], hexRadix) / alphaFactor : defaultAlpha,
          b: Number.parseInt(result[RgbIndexes.b] ?? "0", hexRadix),
          g: Number.parseInt(result[RgbIndexes.g] ?? "0", hexRadix),
          r: Number.parseInt(result[RgbIndexes.r] ?? "0", hexRadix),
        }
      : undefined;
  }
}
