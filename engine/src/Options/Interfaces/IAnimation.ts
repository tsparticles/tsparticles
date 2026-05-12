import type { AnimationMode } from "../../Enums/Modes/AnimationMode.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { StartValueType } from "../../Enums/Types/StartValueType.js";

/**
 * Base animation settings.
 */
export interface IAnimation {
  /**
   * Animation loop count
   */
  count: RangeValue;

  /**
   * Speed animation decay
   */
  decay: RangeValue;

  /**
   * Animation delay, first time only
   */
  delay: RangeValue;

  /**
   * Enables/disables the animation
   */
  enable: boolean;

  /**
   * Speed animation
   */
  speed: RangeValue;

  /**
   * Enables the sync animations for the particles created at the same time
   * pushed or emitter particles will be out of sync
   */
  sync: boolean;
}

/** Ranged animation options */
export interface IRangedAnimation extends IAnimation {
  /** Animation mode */
  mode: AnimationMode | keyof typeof AnimationMode;

  /** Animation start value */
  startValue: StartValueType | keyof typeof StartValueType;
}
