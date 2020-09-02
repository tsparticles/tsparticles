import type { IOptionsColor } from "../IOptionsColor";
import type { IColorAnimation } from "./IColorAnimation";

/**
 * [[include:Options/Particles/Color.md]]
 * @category Options
 */
export interface IAnimatableColor extends IOptionsColor {
    animation: IColorAnimation;
}
