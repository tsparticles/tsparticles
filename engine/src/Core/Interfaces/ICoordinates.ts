import type { PixelMode } from "../../Enums/Modes/PixelMode.js";
import type { RangeValue } from "../../Types/RangeValue.js";

export interface ICoordinates {
  x: number;
  y: number;
}

export interface ICoordinates3d extends ICoordinates {
  z: number;
}

export interface IRangedCoordinates {
  x: RangeValue;
  y: RangeValue;
}

export interface IRangedCoordinates3d extends IRangedCoordinates {
  z: RangeValue;
}

export interface ICoordinatesWithMode extends ICoordinates {
  mode: PixelMode | keyof typeof PixelMode;
}

export interface ICenterCoordinates extends ICoordinatesWithMode {
  radius: number;
}
