import type { IRotateAnimation } from "./IRotateAnimation";
import type { RotateDirection } from "../../../../Enums";

export interface IRotate {
    animation: IRotateAnimation;
    direction: RotateDirection;
    path: boolean;
    random: boolean;
    value: number;
}
