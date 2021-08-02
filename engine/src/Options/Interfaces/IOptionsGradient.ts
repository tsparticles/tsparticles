import type { IGradient, IGradientColor } from "../../Core/Interfaces";
import type { IAnimatableColor } from "./IAnimatableColor";

export interface IAnimatableGradientColor extends IGradientColor {
    value: IAnimatableColor;
}

export type IOptionsGradient = IGradient;
