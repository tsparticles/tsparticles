import type { IColor, IRangeColor, IRgb, IRgba } from "./Colors.js";

/** Color manager interface for parsing and converting colors */
export interface IColorManager {
  /** Checks if the manager accepts the given input string */
  accepts(input: string): boolean;

  /** Converts a color to RGB */
  handleColor(color: IColor): IRgb | undefined;

  /** Converts a range color to RGB */
  handleRangeColor(color: IRangeColor): IRgb | undefined;

  /** Parses a string into RGBA */
  parseString(input: string): IRgba | undefined;
}
