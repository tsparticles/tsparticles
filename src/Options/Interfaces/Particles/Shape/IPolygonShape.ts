import type { IOptionLoader } from "../../IOptionLoader";
import type { IShapeValues } from "./IShapeValues";

export interface IPolygonShape extends IShapeValues, IOptionLoader<IPolygonShape> {
    /**
     * @deprecated use the new sides instead
     */
    nb_sides: number;

    sides: number;
}
