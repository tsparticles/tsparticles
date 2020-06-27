import type { IRotateAnimation } from "./IRotateAnimation";
import type { IOptionLoader } from "../../IOptionLoader";
import type { RotateDirection } from "../../../../Enums";

export interface IRotate extends IOptionLoader<IRotate> {
    animation: IRotateAnimation;
    direction: RotateDirection;
    path: boolean;
    random: boolean;
    value: number;
}
