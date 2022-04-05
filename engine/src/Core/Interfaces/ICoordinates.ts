/**
 * @category Interfaces
 * @module
 */
import type { RangeValue } from "../../Types/RangeValue";

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
