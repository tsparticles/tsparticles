import type { ICoordinates } from "../../../../Core";

/**
 * @category Options
 */
export interface IMoveAttract {
    distance: number;

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
