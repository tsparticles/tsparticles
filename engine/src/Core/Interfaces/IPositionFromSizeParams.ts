import type { ICoordinates, IRangedCoordinates } from "./ICoordinates";
import type { IDimension } from "./IDimension";

/**
 * [[IPositionFromSizeParams]] describes the parameters for [[calcPositionFromSize]] and [[calcPositionOrRandomFromSize]] functions.
 */
export interface IPositionFromSizeParams {
    /**
     * the size to use for calculating the position
     */
    size: IDimension;

    /**
     * the position to use for calculating the exact position
     */
    position?: Partial<ICoordinates>;
}

/**
 * [[IRangedPositionFromSizeParams]] describes the parameters for [[calcPositionFromSize]] and [[calcPositionOrRandomFromSize]] functions.
 */
export interface IRangedPositionFromSizeParams {
    /**
     * the size to use for calculating the position
     */
    size: IDimension;

    /**
     * the position to use for calculating the exact position
     */
    position?: Partial<IRangedCoordinates>;
}
