import type { RotateDirection, RotateDirectionAlt } from "../../Enums/Directions/RotateDirection";
import type { GradientType } from "../../Enums/Types/GradientType";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor";
import type { RangeValue } from "../../Types/RangeValue";

export interface IGradientColorOpacity {
    value: RangeValue;
}

export interface IGradientColor {
    value: IOptionsColor;
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
