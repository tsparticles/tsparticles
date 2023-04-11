import type { IShapeValues } from "../Core/Interfaces/IShapeValues";
import type { SingleOrMultiple } from "./SingleOrMultiple";

/**
 
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
