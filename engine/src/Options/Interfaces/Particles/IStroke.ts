import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IColor } from "../../../Core/Interfaces/Colors.js";
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
  color?: string | RecursivePartial<IAnimatableColor> | RecursivePartial<IColor>;

  /**
   * The stroke opacity
   */
  opacity?: RangeValue;

  /**
   * The stroke line width
   */
  width: RangeValue;
}
