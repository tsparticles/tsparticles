import type { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { IRotateAnimation } from "./IRotateAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export interface IRotate extends IValueWithRandom {
    animation: IRotateAnimation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
}
