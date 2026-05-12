import type { IAnimatable, IAnimatableColor, IAnimation, StartValueType } from "@tsparticles/engine";
import type { IGradient, IGradientColor, IGradientColorOpacity } from "./Gradients.js";

/** The gradient color opacity animation options */
export interface IGradientColorOpacityAnimation extends IAnimation {
  /** The gradient color opacity animation start value */
  startValue: StartValueType | keyof typeof StartValueType;
}

/** The animatable gradient color options */
export interface IAnimatableGradientColor extends IGradientColor {
  /** The animatable gradient color opacity */
  opacity?: (IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>) | number;
  /** The animatable gradient color value */
  value: IAnimatableColor;
}

/** The gradient options */
export type IOptionsGradient = IGradient;
