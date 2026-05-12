import type { RangeValue } from "../../../../Types/RangeValue.js";

/** Particle movement gravity options */
export interface IMoveGravity {
  /** Gravity acceleration value */
  acceleration: RangeValue;
  /** Enables or disables gravity */
  enable: boolean;
  /** If true, gravity pulls particles upward instead of downward */
  inverse: boolean;
  /** Maximum speed limit for gravity-affected particles */
  maxSpeed: RangeValue;
}
