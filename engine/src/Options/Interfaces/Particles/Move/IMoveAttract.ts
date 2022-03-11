import type { ICoordinates } from "../../../../Core";
import type { RangeValue } from "../../../../Types";

/**
 * @category Options
 */
export interface IMoveAttract {
    distance: RangeValue;

    enable: boolean;

    /**
     * @deprecated use the new rotate.x instead
     */
    rotateX: number;

    /**
     * @deprecated use the new rotate.y instead
     */
    rotateY: number;

    rotate: ICoordinates;
}
