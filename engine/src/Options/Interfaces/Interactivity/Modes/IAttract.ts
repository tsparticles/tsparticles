import type { EasingType, EasingTypeAlt } from "../../../../Enums/Types/EasingType";

/**
 * @category Options
 */
export interface IAttract {
    distance: number;
    duration: number;
    easing: EasingType | EasingTypeAlt;
    factor: number;
    maxSpeed: number;
    speed: number;
}
