/**
 * @category Options
 */
import type { EasingType } from "../../../../Enums/Types/EasingType";

export interface IAttract {
    distance: number;
    duration: number;
    easing: EasingType | keyof typeof EasingType;
    factor: number;
    maxSpeed: number;
    speed: number;
}
