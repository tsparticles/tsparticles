import type { EasingType, EasingTypeAlt } from "@tsparticles/engine";

/**
 */
export interface IRepulseBase {
    distance: number;
    duration: number;
    easing: EasingType | EasingTypeAlt;
    factor: number;
    maxSpeed: number;
    speed: number;
}
