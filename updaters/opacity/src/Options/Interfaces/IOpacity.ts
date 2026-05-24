import type { IOpacityAnimation } from "./IOpacityAnimation.js";
import type { IValueWithRandom } from "@tsparticles/engine";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export interface IOpacity extends IValueWithRandom {
  /**
   * The animation opacity options
   */
  animation: IOpacityAnimation;
}
