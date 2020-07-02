import type { IShapeValues } from "./IShapeValues";

export interface IPolygonShape extends IShapeValues {
    /**
     * @deprecated use the new sides instead
     */
    nb_sides: number;

    sides: number;
}
