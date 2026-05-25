import type { IShapeValues, RangeValue } from "@tsparticles/engine";

export interface IRibbonLight {
  enable: boolean;
  value: RangeValue;
}

export interface IRibbonData extends IShapeValues {
  angle?: RangeValue;
  backColor?: string;
  count?: RangeValue;
  darken?: IRibbonLight;
  drag?: RangeValue;
  enlighten?: IRibbonLight;
  mass?: RangeValue;
  oscillationDistance?: RangeValue;
  oscillationSpeed?: RangeValue;
  particleDist?: RangeValue;
  thickness?: RangeValue;
  velocityInherit?: RangeValue;
  ySpeed?: RangeValue;
}
