import type { IAnimation, IRangedAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";

export interface IValueWithRandom {
  /**
   * Value of property.
   */
  value: RangeValue;
}

export interface IAnimationValueWithRandom extends IValueWithRandom {
  /**
   * Animation options, based on {@link value}.
   */
  animation: IAnimation;
}

export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
  /**
   * Animation options, based on {@link value}.
   */
  animation: IRangedAnimation;
}
