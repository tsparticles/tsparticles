import type { ICoordinates, RangeValue } from "@tsparticles/engine";

/**
 */
export interface IAttract {
  distance: RangeValue;

  enable: boolean;

  rotate: ICoordinates;
}
