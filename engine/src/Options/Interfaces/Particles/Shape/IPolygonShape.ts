import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues";

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
