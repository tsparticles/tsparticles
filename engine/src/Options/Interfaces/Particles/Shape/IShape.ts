import type { ShapeData, SingleOrMultiple } from "../../../../Types";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export interface IShape {
    type: SingleOrMultiple<string>;

    options: ShapeData;
}
