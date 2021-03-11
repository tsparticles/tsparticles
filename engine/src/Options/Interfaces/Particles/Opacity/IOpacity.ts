import type { IOpacityAnimation } from "./IOpacityAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { IAnimatable } from "../../IAnimatable";

/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */
export interface IOpacity extends IValueWithRandom, IAnimatable<IOpacityAnimation> {
    /**
     * @deprecated use the new animation instead
     */
    anim: IOpacityAnimation;
}
