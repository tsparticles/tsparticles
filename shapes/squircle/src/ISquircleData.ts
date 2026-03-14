import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface ISquircleData extends IShapeValues {
  exponent?: RangeValue;
  steps?: RangeValue;
}
