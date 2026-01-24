import type { PixelMode } from "../../Enums/Modes/PixelMode.js";

/**
 */
export interface IDimension {
  height: number;
  width: number;
}

export interface IDimensionWithMode extends IDimension {
  mode: PixelMode | keyof typeof PixelMode;
}
