import type { GradientType, IOptionsColor, RangeValue, RotateDirection, RotateDirectionAlt } from "tsparticles-engine";

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
