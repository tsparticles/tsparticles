import type { IRotateAnimation } from "./IRotateAnimation";
import type { RotateDirection } from "../../../../Enums";
import { ClickMode } from "../../../../Enums";

export interface IRotate {
    animation: IRotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection;
    path: boolean;
    random: boolean;
    value: number;
}
