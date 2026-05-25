import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface IRibbonData extends IShapeValues {
  angle?: RangeValue;
  backColor?: string;
  count?: RangeValue;
  drag?: RangeValue;
  mass?: RangeValue;
  oscillationDistance?: RangeValue;
  oscillationSpeed?: RangeValue;
  particleDist?: RangeValue;
  velocityInherit?: RangeValue;
  ySpeed?: RangeValue;
}
