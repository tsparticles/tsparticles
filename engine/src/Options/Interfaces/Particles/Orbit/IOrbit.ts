import type { IAnimatable } from "../../IAnimatable";
import type { IAnimation } from "../../IAnimation";
import type { IOptionsColor } from "../../IOptionsColor";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 * [[include:Options/Particles/Orbit.md]]
 */
export interface IOrbit extends IAnimatable<IAnimation> {
    color?: string | IOptionsColor;

    /**
     * Enables/disables the animation
     */
    enable: boolean;

    radius?: RangeValue;
    rotation: IValueWithRandom;
    opacity: RangeValue;
    width: RangeValue;
}
