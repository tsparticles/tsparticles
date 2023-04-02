import type { ICoordinates, IRangedCoordinates } from "./ICoordinates";
import type { IDimension } from "./IDimension";

/**
 * {@link IRangedPositionFromSizeParams} describes the parameters for {@link Utils/NumberUtils!calcPositionFromSize} and {@link Utils/NumberUtils!calcPositionOrRandomFromSize} functions.
 */
export interface IPositionFromSizeParams {
    /**
     * the position to use for calculating the exact position
     */
    position?: Partial<ICoordinates>;

    /**
     * the size to use for calculating the position
     */
    size: IDimension;
}

/**
 * {@link IRangedPositionFromSizeParams} describes the parameters for {@link Utils/NumberUtils!calcPositionFromSize} and {@link Utils/NumberUtils!calcPositionOrRandomFromSize} functions.
 */
export interface IRangedPositionFromSizeParams {
    /**
     * the position to use for calculating the exact position
     */
    position?: Partial<IRangedCoordinates>;

    /**
     * the size to use for calculating the position
     */
    size: IDimension;
}
