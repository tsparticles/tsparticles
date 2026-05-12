import type { GradientType, IOptionsColor, RangeValue, RotateDirection, RotateDirectionAlt } from "@tsparticles/engine";

/** The gradient color opacity options */
export interface IGradientColorOpacity {
  /** The gradient color opacity value */
  value: RangeValue;
}

/** The gradient color options */
export interface IGradientColor {
  /** The gradient color opacity */
  opacity?: IGradientColorOpacity | number;
  /** The gradient color stop */
  stop: number;
  /** The gradient color value */
  value: IOptionsColor;
}

/** The gradient angle options */
export interface IGradientAngle {
  /** The gradient angle direction */
  direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
  /** The gradient angle value */
  value: RangeValue;
}

/** The gradient options */
export interface IGradient {
  /** The gradient angle */
  angle?: IGradientAngle;
  /** The gradient colors */
  colors: IGradientColor[];
  /** The gradient type */
  type: GradientType;
}
