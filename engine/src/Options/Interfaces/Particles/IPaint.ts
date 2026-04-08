import type { IFill } from "./IFill.js";
import type { IStroke } from "./IStroke.js";

/**
 * Particle paint options, grouping fill and stroke so variants can be selected together
 * [[include:Options/Particles/Paint.md]]
 */
export interface IPaint {
  /**
   * Particle fill options
   */
  fill?: IFill;

  /**
   * Particle stroke options
   */
  stroke?: IStroke;
}
