import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RangeValue } from "../../../../Types";

/**
 * @category Options
 * [[include:Options/Particles/Repulse.md]]
 */
export interface IRepulse extends IValueWithRandom {
    enabled: boolean;
    distance: RangeValue;
    duration: RangeValue;
    factor: RangeValue;
    speed: RangeValue;
}
