import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 */
export interface IMoveAttract {
    distance: RangeValue;

    enable: boolean;

    rotate: ICoordinates;

    /**
     * @deprecated use the new rotate.x instead
     */
    rotateX: number;

    /**
     * @deprecated use the new rotate.y instead
     */
    rotateY: number;
}
