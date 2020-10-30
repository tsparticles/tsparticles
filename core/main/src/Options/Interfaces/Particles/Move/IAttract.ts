import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";

/**
 * @category Options
 */
export interface IAttract {
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
