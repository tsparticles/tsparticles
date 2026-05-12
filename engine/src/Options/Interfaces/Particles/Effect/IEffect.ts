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

  /** Effect shape options data */
  options: ShapeData;

  /** Effect type name or array of names */
  type: SingleOrMultiple<string>;
}
