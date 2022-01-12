import type { GradientType, RotateDirectionAlt } from "../../Enums";
import type { IColor } from "./Colors";
import type { RangeValue } from "../../Types";
import type { RotateDirection } from "../../Enums";

export interface IGradientColorOpacity {
    value: RangeValue;
}

export interface IGradientColor {
    value: IColor;
    stop: number;
    opacity?: IGradientColorOpacity | number;
}

export interface IGradientAngle {
    value: number;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
}

export interface IGradient {
    angle?: IGradientAngle;
    type: GradientType;
    colors: IGradientColor[];
}
