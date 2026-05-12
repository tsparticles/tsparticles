import type { IAnimation, IRangedAnimation } from "./IAnimation.js";
import type { RangeValue } from "../../Types/RangeValue.js";

/** Value with random range configuration */
export interface IValueWithRandom {
  /**
   * Value of property.
   */
  value: RangeValue;
}

/** Animation value with random range configuration */
export interface IAnimationValueWithRandom extends IValueWithRandom {
  /**
   * Animation options, based on {@link value}.
   */
  animation: IAnimation;
}

/** Ranged animation value with random options */
export interface IRangedAnimationValueWithRandom extends IAnimationValueWithRandom {
  /**
   * Animation options, based on {@link value}.
   */
  animation: IRangedAnimation;
}
