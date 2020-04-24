import type { IRotateAnimation } from "./IRotateAnimation";
import type { IOptionLoader } from "../../IOptionLoader";
import type { RotateDirection } from "../../../../Enums/RotateDirection";

export interface IRotate extends IOptionLoader<IRotate> {
    animation: IRotateAnimation;
    random: boolean;
    value: number;
    direction: RotateDirection;
}
