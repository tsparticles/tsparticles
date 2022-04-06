import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 * @category Options
 * [[include:Options/Particles/Repulse.md]]
 */
export interface IParticlesRepulse extends IValueWithRandom {
    enabled: boolean;
    distance: RangeValue;
    duration: RangeValue;
    factor: RangeValue;
    speed: RangeValue;
}
