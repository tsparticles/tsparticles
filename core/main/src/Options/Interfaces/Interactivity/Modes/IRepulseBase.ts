/**
 * @category Options
 */
import type { EasingType } from "../../../../Enums";

export interface IRepulseBase {
    distance: number;
    duration: number;
    factor: number;
    speed: number;
    maxSpeed: number;
    easing: EasingType;
}
