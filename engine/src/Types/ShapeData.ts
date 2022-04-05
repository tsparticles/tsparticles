import type { IShapeValues } from "../Core/Interfaces/IShapeValues";
import type { SingleOrMultiple } from "./SingleOrMultiple";

/**
 * @category Types
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
