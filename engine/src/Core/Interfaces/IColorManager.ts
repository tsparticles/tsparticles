import type { IColor, IOklcha, IRangeColor, IRgb, IRgba } from "./Colors.js";

/** Native color manager contract. Resolved values are always canonical OKLCH. */
export interface IColorManager {
  /** Checks if the manager accepts the given input string. */
  accepts(input: string): boolean;

  /** Resolves a color to canonical OKLCH and alpha. */
  handleColorOklch(color: IColor): IOklcha | undefined;

  /** Resolves a range color to canonical OKLCH and alpha. */
  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined;

  /** Parses a string directly to canonical OKLCH and alpha. */
  parseStringOklch(input: string): IOklcha | undefined;
}

/** Previous sRGB-based manager contract, supported only through an explicit adapter. */
export interface ILegacyColorManager {
  accepts(input: string): boolean;
  handleColor(color: IColor): IRgb | undefined;
  handleRangeColor(color: IRangeColor): IRgb | undefined;
  parseString(input: string): IRgba | undefined;
}
