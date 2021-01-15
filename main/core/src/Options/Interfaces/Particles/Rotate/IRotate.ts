import type { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { IAnimatable } from "../../IAnimatable";
import type { IAnimation } from "../../IAnimation";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export interface IRotate extends IValueWithRandom, IAnimatable<IAnimation> {
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path: boolean;
}
