import type { IValueWithRandom } from "../../IValueWithRandom";

/**
 * @category Options
 * [[include:Options/Particles/Repulse.md]]
 */
export interface IParticlesRepulse extends IValueWithRandom {
    enabled: boolean;
    distance: number;
    duration: number;
    factor: number;
    speed: number;
}
