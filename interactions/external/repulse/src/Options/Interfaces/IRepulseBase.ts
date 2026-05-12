import type { EasingType, EasingTypeAlt } from "@tsparticles/engine";

/**
 * Repulse mode base options
 */
export interface IRepulseBase {
  /** Repulse distance in pixels */
  distance: number;
  /** Repulse animation duration in seconds */
  duration: number;
  /** Repulse animation easing type */
  easing: EasingType | EasingTypeAlt;
  /** Repulse factor multiplier */
  factor: number;
  /** Maximum repulse speed */
  maxSpeed: number;
  /** Repulse speed */
  speed: number;
}
