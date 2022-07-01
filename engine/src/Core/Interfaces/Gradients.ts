import type { RotateDirection, RotateDirectionAlt } from "../../Enums/Directions/RotateDirection";
import type { GradientType } from "../../Enums/Types/GradientType";
import type { IOptionsColor } from "../../Options/Interfaces/IOptionsColor";
import type { RangeValue } from "../../Types/RangeValue";

export interface IGradientColorOpacity {
    value: RangeValue;
}

export interface IGradientColor {
    opacity?: IGradientColorOpacity | number;
    stop: number;
    value: IOptionsColor;
}

export interface IGradientAngle {
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    value: number;
}

export interface IGradient {
    angle?: IGradientAngle;
    colors: IGradientColor[];
    type: GradientType;
}
