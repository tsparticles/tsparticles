import type { AnimationStatus } from "../../Enums/AnimationStatus.js";
import type { RangeValue } from "../../Types/RangeValue.js";

/** Particle value animation state */
export interface IParticleValueAnimation<T> {
  /** Value decay factor applied each frame */
  decay?: number;
  /** Delay before the animation starts, in seconds */
  delayTime?: number;
  /** Enables or disables the animation */
  enable: boolean;
  /** The initial value before any animation is applied */
  initialValue?: number;
  /** Current loop count */
  loops?: number;
  /** Maximum number of loops before the animation stops */
  maxLoops?: number;
  /** Current animation status (increasing, decreasing, or none) */
  status?: AnimationStatus;
  /** Elapsed time since the animation started */
  time?: number;
  /** Current animated value */
  value: T;
  /** Animation velocity per frame */
  velocity?: number;
}

/** Particle numeric value animation state with min/max bounds */
export interface IParticleNumericValueAnimation extends IParticleValueAnimation<number> {
  /** Maximum value */
  max: number;
  /** Minimum value */
  min: number;
}

/** Particle color channel animation state with optional offset */
export interface IParticleColorAnimation extends IParticleNumericValueAnimation {
  /** Random offset applied to the color value */
  offset?: RangeValue;
}
