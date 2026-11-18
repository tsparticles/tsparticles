import type { IColor, IOklcha, IRangeColor, IRgb, IRgba } from "./Colors.js";

/** Color manager interface for parsing and converting colors */
export interface IColorManager {
  /**
   * Checks if the manager accepts the given input string
   * @returns The boolean value
   */
  accepts(input: string): boolean;

  /**
   * Converts a color to RGB
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined;

  /**
   * Resolves a color directly to canonical OKLCH when the manager can do so
   * without converting through quantized RGB. Legacy managers can omit this
   * method and are adapted from their RGB result by the engine.
   */
  handleColorOklch?(color: IColor): IOklcha | undefined;

  /**
   * Converts a range color to RGB
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined;

  /** Resolves a range color directly to canonical OKLCH. */
  handleRangeColorOklch?(color: IRangeColor): IOklcha | undefined;

  /**
   * Parses a string into RGBA
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined;

  /** Parses a string directly to canonical OKLCH, preserving alpha. */
  parseStringOklch?(input: string): IOklcha | undefined;
}
