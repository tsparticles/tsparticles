/**
 * @category Options
 * [[include:Repulse.md]]
 */
import type { IValueWithRandom } from "../../IValueWithRandom";

export interface IRepulse extends IValueWithRandom {
    enabled: boolean;
    distance: number;
    duration: number;
    factor: number;
    speed: number;
}
