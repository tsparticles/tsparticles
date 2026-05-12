import type { IAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";

/**
 * Color animation settings.
 */
export interface IColorAnimation extends IAnimation {
  /** Maximum animation value */
  max: number;
  /** Minimum animation value */
  min: number;

  /**
   * The value offset percent applied to color hue
   */
  offset: RangeValue;
}
