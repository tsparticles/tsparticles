import type { SingleOrMultiple } from "../../Types";
import type { IColor } from "./Colors";
import type { GradientType } from "../../Enums";

export interface IGradientColor {
    value: IColor;
    stop: number;
}

export interface IGradientAngle {
    value: number;
}

export interface IGradient {
    angle?: IGradientAngle;
    type: GradientType;
    colors: SingleOrMultiple<IGradientColor>;
}
