import type { IAnimatable, IAnimation, IOptionsColor, IValueWithRandom, RangeValue } from "tsparticles-engine";

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

    opacity: RangeValue;
    radius?: RangeValue;
    rotation: IValueWithRandom;
    width: RangeValue;
}
