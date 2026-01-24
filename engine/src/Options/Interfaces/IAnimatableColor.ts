import type { IColorAnimation } from "./IColorAnimation.js";
import type { IHslAnimation } from "./IHslAnimation.js";
import type { IOptionsColor } from "./IOptionsColor.js";

/**
 * The animatable color interface, it provides all the necessary properties to create a color animation
 * [[include:Options/Particles/Color.md]]
 */
export interface IAnimatableColor extends IOptionsColor {
  /**
   * The color animation property
   */
  animation: IColorAnimation | IHslAnimation;
}
