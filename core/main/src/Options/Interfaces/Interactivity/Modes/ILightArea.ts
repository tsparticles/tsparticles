import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILightGradient {
    start: string | IColor;
    stop: string | IColor;
}

export interface ILightArea {
    gradient: ILightGradient;
    radius: number;
}
