import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

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

  /**
   * Shape options
   */
  options: ShapeData;

  /**
   * Shape type
   */
  type: SingleOrMultiple<string>;
}
