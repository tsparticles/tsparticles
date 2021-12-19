import type { ShapeType } from "../../../../Enums";
import type { ShapeData, SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export interface IShape {
    type: SingleOrMultiple<ShapeType | keyof typeof ShapeType | string>;

    options: ShapeData;
}
