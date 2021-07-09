import type { SingleOrMultiple } from "./SingleOrMultiple";
import type { IShapeValues } from "../Options/Interfaces/Particles/Shape/IShapeValues";

/**
 * @category Types
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
