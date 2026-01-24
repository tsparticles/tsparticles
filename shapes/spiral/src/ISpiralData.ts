import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface ISpiralData extends IShapeValues {
  innerRadius: RangeValue;
  lineSpacing: RangeValue;
  widthFactor: RangeValue;
}
