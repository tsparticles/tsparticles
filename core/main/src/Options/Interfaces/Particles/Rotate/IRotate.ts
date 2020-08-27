import type { IRotateAnimation } from "./IRotateAnimation";
import type { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { IValueWithRandom } from "../../IValueWithRandom";

export interface IRotate extends IValueWithRandom {
    animation: IRotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
}
