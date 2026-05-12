import type { PixelMode } from "../../Enums/Modes/PixelMode.js";

/** Dimensions with width and height */
export interface IDimension {
  /** The height value */
  height: number;
  /** The width value */
  width: number;
}

/** Dimensions with pixel mode */
export interface IDimensionWithMode extends IDimension {
  /** Pixel mode (precise or percent) */
  mode: PixelMode | keyof typeof PixelMode;
}
