import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";

/**
 * @category Types
 */
export type ShapeDataValue = SingleOrMultiple<IShapeValues>;

export type ShapeData = {
    [type: string]: ShapeDataValue;
};
