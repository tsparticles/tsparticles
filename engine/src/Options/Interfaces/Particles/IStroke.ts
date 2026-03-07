import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IRangeColor } from "../../../Core/Interfaces/Colors.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * Particle stroke, outlines the particle with a customizable line
 * [[include:Options/Particles/Stroke.md]]
 */
export interface IStroke {
  /**
   * The stroke color, can be animated too
   */
  color?: RecursivePartial<IAnimatableColor> | RecursivePartial<IRangeColor>;

  /**
   * The stroke opacity
   */
  opacity?: RangeValue;

  /**
   * The stroke line width
   */
  width: RangeValue;
}
