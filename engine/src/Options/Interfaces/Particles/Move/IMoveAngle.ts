import type { RangeValue } from "../../../../Types/RangeValue.js";

/** Particle movement angle options */
export interface IMoveAngle {
  /** Angle offset value */
  offset: RangeValue;
  /** Angle value in degrees */
  value: RangeValue;
}
