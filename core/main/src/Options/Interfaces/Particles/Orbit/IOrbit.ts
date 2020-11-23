import type { IHsl } from "../../../../Core/Interfaces/Colors";
import type { IOrbitAnimation } from "./IOrbitAnimation";
import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * @category Options
 * [[include:Options/Particles/Orbit.md]]
 */
export interface IOrbit {
    animation: IOrbitAnimation;
    color?: IHsl;

    /**
     * Enables/disables the animation
     */
    enable: boolean;

    radius?: number;
    rotation: IValueWithRandom;
    opacity: number;
    width: number;
}
