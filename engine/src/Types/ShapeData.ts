import type { IShapeValues } from "../Core/Interfaces/IShapeValues.js";
import type { SingleOrMultiple } from "./SingleOrMultiple.js";

/**
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
