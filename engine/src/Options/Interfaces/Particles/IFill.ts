import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IColor } from "../../../Core/Interfaces/Colors.js";
import type { RangeValue } from "../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * Particle fill, fills the particle with the given color
 * [[include:Options/Particles/Fill.md]]
 */
export interface IFill {
  /**
   * The fill color, can be animated too
   */
  color?: string | RecursivePartial<IAnimatableColor> | RecursivePartial<IColor>;

  /**
   * Enables or disables the fill
   */
  enable: boolean;

  /**
   * The fill opacity
   */
  opacity?: RangeValue;
}
