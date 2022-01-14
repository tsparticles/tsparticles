import type { IAnimatable } from "../../IAnimatable";
import type { IAnimation } from "../../IAnimation";
import type { IColor } from "../../../../Core";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * @category Options
 * [[include:Options/Particles/Orbit.md]]
 */
export interface IOrbit extends IAnimatable<IAnimation> {
    color?: string | IColor;

    /**
     * Enables/disables the animation
     */
    enable: boolean;

    radius?: number;
    rotation: IValueWithRandom;
    opacity: number;
    width: number;
}
