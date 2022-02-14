import type { ISizeAnimation } from "./ISizeAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export interface ISize extends IValueWithRandom {
    animation: ISizeAnimation;
}
