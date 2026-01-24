/**
 * Color animation interface, these properties are used to animate colors
 */
import type { IAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";

export interface IColorAnimation extends IAnimation {
  /**
   * The value offset percent applied to color hue
   */
  offset: RangeValue;
}
