import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

/** Spin animation options */
export interface ISpin {
  /** Spin acceleration */
  acceleration: RangeValue;
  /** Enables/disables the spin */
  enable: boolean;
  /** Spin center position */
  position?: ICoordinatesWithMode;
}
