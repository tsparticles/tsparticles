import type { IAnimatable, IAnimatableColor, IAnimation, StartValueType } from "tsparticles-engine";
import type { IGradient, IGradientColor, IGradientColorOpacity } from "./Gradients";

export interface IGradientColorOpacityAnimation extends IAnimation {
    startValue: StartValueType | keyof typeof StartValueType;
}

export interface IAnimatableGradientColor extends IGradientColor {
    opacity?: (IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>) | number;
    value: IAnimatableColor;
}

export type IOptionsGradient = IGradient;
