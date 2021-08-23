import type { IGradient, IGradientColor, IGradientColorOpacity } from "../../Core/Interfaces";
import type { IAnimatableColor } from "./IAnimatableColor";
import type { IAnimatable } from "./IAnimatable";
import type { IAnimation } from "./IAnimation";
import type { StartValueType } from "../../Enums";

export interface IGradientColorOpacityAnimation extends IAnimation {
    startValue: StartValueType | keyof typeof StartValueType;
}

export interface IAnimatableGradientColor extends IGradientColor {
    value: IAnimatableColor;
    opacity?: (IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>) | number;
}

export type IOptionsGradient = IGradient;
