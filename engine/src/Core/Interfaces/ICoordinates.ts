import type { PixelMode } from "../../Enums/Modes/PixelMode.js";
import type { RangeValue } from "../../Types/RangeValue.js";

/** 2D coordinates interface */
export interface ICoordinates {
  /** The x coordinate */
  x: number;
  /** The y coordinate */
  y: number;
}

/** 3D coordinates interface extending 2D coordinates */
export interface ICoordinates3d extends ICoordinates {
  /** The z coordinate */
  z: number;
}

/** Ranged 2D coordinates with range values */
export interface IRangedCoordinates {
  /** The x coordinate range */
  x: RangeValue;
  /** The y coordinate range */
  y: RangeValue;
}

/** Ranged 3D coordinates extending ranged 2D coordinates */
export interface IRangedCoordinates3d extends IRangedCoordinates {
  /** The z coordinate range */
  z: RangeValue;
}

/** Coordinates with pixel mode */
export interface ICoordinatesWithMode extends ICoordinates {
  /** The pixel mode */
  mode: PixelMode | keyof typeof PixelMode;
}

/** Center coordinates with radius and pixel mode */
export interface ICenterCoordinates extends ICoordinatesWithMode {
  /** The center radius */
  radius: number;
}
