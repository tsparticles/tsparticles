import type { ISizeAnimation } from "./ISizeAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * [[include:Options/Particles/Size.md]]
 *
 
 */
export interface ISize extends IValueWithRandom {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;

    animation: ISizeAnimation;
}
