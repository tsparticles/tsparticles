import type { ISizeAnimation } from "./ISizeAnimation.js";
import type { IValueWithRandom } from "../../IValueWithRandom.js";

/**
 * [[include:Options/Particles/Size.md]]
 */
export interface ISize extends IValueWithRandom {
  /**
   * The animation applied to the size of the particles.
   */
  animation: ISizeAnimation;
}
