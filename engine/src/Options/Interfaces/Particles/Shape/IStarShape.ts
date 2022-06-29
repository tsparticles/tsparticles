import type { IShapeValues } from "./IShapeValues";

/**
 * @category Options
 */
export interface IStarShape extends IShapeValues {
    inset: number;

    /**
     * @deprecated use the new sides instead
     */
    nb_sides: number;

    sides: number;
}
