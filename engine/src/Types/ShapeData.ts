import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Core/Interfaces/IShapeValues";

/**
 * @category Types
 */
export type ShapeDataValue = SingleOrMultiple<IShapeValues>;

export type ShapeData = {
    [type: string]: ShapeDataValue;
};
