import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * [[include:Options/Particles/Shape.md]]
 */
export interface IShape {
    /**
     * Set this property to false for creating an open shape
     */
    close: boolean;

    /**
     * Set this property to false for creating an empty shape
     */
    fill: boolean;

    options: ShapeData;

    type: SingleOrMultiple<string>;
}
