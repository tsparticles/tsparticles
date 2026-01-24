import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

/**
 */
export interface IMoveAttract {
  distance: RangeValue;

  enable: boolean;

  rotate: ICoordinates;
}
