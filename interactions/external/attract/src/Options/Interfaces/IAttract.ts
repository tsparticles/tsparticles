import type { EasingType, EasingTypeAlt } from "tsparticles-engine";

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
