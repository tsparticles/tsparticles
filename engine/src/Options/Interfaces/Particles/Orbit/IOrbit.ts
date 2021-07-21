import type { IColor } from "../../../../Core/Interfaces";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { IAnimation } from "../../IAnimation";
import type { IAnimatable } from "../../IAnimatable";

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
