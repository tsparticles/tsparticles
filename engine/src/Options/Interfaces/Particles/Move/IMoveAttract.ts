import type { ICoordinates } from "../../../../Core";

/**
 * @category Options
 */
export interface IMoveAttract {
    distance: number;

    enable: boolean;

    rotate: ICoordinates;
}
