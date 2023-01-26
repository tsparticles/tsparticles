import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export interface IShape {
    close: boolean;

    fill: boolean;

    options: ShapeData;

    type: SingleOrMultiple<string>;
}
