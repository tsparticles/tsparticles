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

    radius?: RangeValue;
    rotation: IValueWithRandom;
    opacity: RangeValue;
    width: RangeValue;
}
