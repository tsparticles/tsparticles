import type { IColorAnimation } from "./IColorAnimation.js";

export interface IHslAnimation {
  /**
   * Animation for hue.
   */
  h: IColorAnimation;

  /**
   * Animation for lightness.
   */
  l: IColorAnimation;

  /**
   * Animation for saturation.
   */
  s: IColorAnimation;
}
