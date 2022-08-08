import type { IValueWithRandom, RangeValue } from "tsparticles-engine";

/**
 * @category Options
 * [[include:Options/Particles/Repulse.md]]
 */
export interface IParticlesRepulse extends IValueWithRandom {
    distance: RangeValue;
    duration: RangeValue;
    enabled: boolean;
    factor: RangeValue;
    speed: RangeValue;
}
