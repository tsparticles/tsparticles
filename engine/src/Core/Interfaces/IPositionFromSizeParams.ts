import type { ICoordinates, IRangedCoordinates } from "./ICoordinates.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { calcPositionFromSize, calcPositionOrRandomFromSize } from "../../Utils/MathUtils.js";
import type { IDimension } from "./IDimension.js";

/**
 * {@link calcPositionFromSize} and {@link calcPositionOrRandomFromSize} functions.
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
 * {@link calcPositionFromSize} and {@link calcPositionOrRandomFromSize} functions.
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
