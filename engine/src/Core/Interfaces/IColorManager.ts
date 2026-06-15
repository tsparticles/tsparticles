import type { IColor, IRangeColor, IRgb, IRgba } from "./Colors.js";

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
   * Converts a range color to RGB
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined;

  /**
   * Parses a string into RGBA
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined;
}
