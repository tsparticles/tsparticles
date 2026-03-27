import type { IShapeValues, RangeValue } from "@tsparticles/engine";

/**
 */
export type IStarShape = IShapeValues & {
  inset?: RangeValue;

  sides?: RangeValue;
};
