import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RangeValue } from "../../../../Types/RangeValue";

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
