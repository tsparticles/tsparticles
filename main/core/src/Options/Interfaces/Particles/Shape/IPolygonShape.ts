import type { IShapeValues } from "./IShapeValues";

/**
 * @category Options
 */
export interface IPolygonShape extends IShapeValues {
    /**
     * @deprecated use the new sides instead
     */
    nb_sides: number;

    sides: number;
}
