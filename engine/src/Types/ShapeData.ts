import type { IShapeValues } from "../Core";
import type { SingleOrMultiple } from "./SingleOrMultiple";

/**
 * @category Types
 */
export type ShapeData = {
    [type: string]: SingleOrMultiple<IShapeValues>;
};
