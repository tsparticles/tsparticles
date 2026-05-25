import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface IRibbonData extends IShapeValues {
  angle?: RangeValue;
  count?: RangeValue;
  drag?: RangeValue;
  mass?: RangeValue;
  oscillationDistance?: RangeValue;
  oscillationSpeed?: RangeValue;
  particleDist?: RangeValue;
  thickness?: RangeValue;
  velocityInherit?: RangeValue;
  ySpeed?: RangeValue;
}
