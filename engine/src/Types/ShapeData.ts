import type { IShapeValues } from "../Core/Interfaces/IShapeValues.js";
import type { SingleOrMultiple } from "./SingleOrMultiple.js";

/**
 * Shape name to shape options mapping.
 */
export type ShapeData = Record<string, SingleOrMultiple<IShapeValues>>;
