import type { RangeValue } from "../../../../Types/RangeValue.js";

export interface IMoveGravity {
  acceleration: RangeValue;
  enable: boolean;
  inverse: boolean;
  maxSpeed: RangeValue;
}
