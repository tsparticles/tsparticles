import type { IColor } from "./Colors";
import type { GradientType } from "../../Enums";

export interface IGradientColor {
    value: IColor;
    stop: number;
    opacity?: number;
}

export interface IGradientAngle {
    value: number;
}

export interface IGradient {
    angle?: IGradientAngle;
    type: GradientType;
    colors: IGradientColor[];
}
