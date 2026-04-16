import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IFill } from "./IFill.js";
import type { IRangeColor } from "../../../Core/Interfaces/Colors.js";
import type { IStroke } from "./IStroke.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * Particle paint options, grouping fill and stroke so variants can be selected together
 * [[include:Options/Particles/Paint.md]]
 */
export interface IPaint {
  /**
   * Default paint color used as fallback for fill and stroke colors
   */
  color?: RecursivePartial<IAnimatableColor> | RecursivePartial<IRangeColor>;

  /**
   * Particle fill options
   */
  fill?: IFill;

  /**
   * Particle stroke options
   */
  stroke?: IStroke;
}
