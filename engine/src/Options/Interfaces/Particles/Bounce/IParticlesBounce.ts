import type { IValueWithRandom } from "../../IValueWithRandom.js";

/** Particles bounce factor options */
export interface IParticlesBounce {
  /** Horizontal bounce factor */
  horizontal: IValueWithRandom;
  /** Vertical bounce factor */
  vertical: IValueWithRandom;
}
