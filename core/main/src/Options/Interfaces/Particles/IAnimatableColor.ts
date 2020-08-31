import type { IOptionsColor } from "../IOptionsColor";
import type { IColorAnimation } from "./IColorAnimation";

/**
 * @category Options
 */
export interface IAnimatableColor extends IOptionsColor {
    animation: IColorAnimation;
}
