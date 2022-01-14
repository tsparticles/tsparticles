import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";
import type { SingleOrMultiple } from "./SingleOrMultiple";

/**
 * @category Types
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
