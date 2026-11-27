import type { IColor, IOklcha, IRangeColor } from "./Colors.js";

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
