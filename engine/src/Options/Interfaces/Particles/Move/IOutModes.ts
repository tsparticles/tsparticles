import type { OutMode } from "../../../../Enums/Modes/OutMode.js";

/** Out modes configuration for each canvas edge */
export interface IOutModes {
  /** Out mode for the bottom edge */
  bottom?: OutMode | keyof typeof OutMode;
  /** Default out mode used when per-edge modes are not set */
  default: OutMode | keyof typeof OutMode;
  /** Out mode for the left edge */
  left?: OutMode | keyof typeof OutMode;
  /** Out mode for the right edge */
  right?: OutMode | keyof typeof OutMode;
  /** Out mode for the top edge */
  top?: OutMode | keyof typeof OutMode;
}
