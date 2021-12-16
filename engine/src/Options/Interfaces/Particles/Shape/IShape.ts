import type { ShapeType } from "../../../../Enums";
import type { IImageShape } from "./IImageShape";
import type { ICharacterShape } from "./ICharacterShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "../IStroke";
import type { ShapeData, SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export interface IShape {
    type: SingleOrMultiple<ShapeType | keyof typeof ShapeType | string>;

    options: ShapeData;
}
