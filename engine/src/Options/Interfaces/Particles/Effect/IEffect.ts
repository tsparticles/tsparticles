import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles/Effect.md]]
 */
export interface IEffect {
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
