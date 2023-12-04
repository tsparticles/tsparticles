import type { ISizeAnimation } from "./ISizeAnimation.js";
import type { IValueWithRandom } from "../../IValueWithRandom.js";

/**
 * [[include:Options/Particles/Size.md]]
 */
export interface ISize extends IValueWithRandom {
    animation: ISizeAnimation;
}
