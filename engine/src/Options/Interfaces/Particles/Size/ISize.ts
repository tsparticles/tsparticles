import type { ISizeAnimation } from "./ISizeAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { IAnimatable } from "../../IAnimatable";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export interface ISize extends IValueWithRandom, IAnimatable<ISizeAnimation> {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;
}
