import { RotateDirection, RotateDirectionAlt } from "../../Enums/Directions/RotateDirection";
import { GradientType } from "../../Enums/Types/GradientType";
import type { IColor } from "./Colors";
import type { RangeValue } from "../../Types/RangeValue";

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
