import type { EasingType, EasingTypeAlt } from "@tsparticles/engine";

/** Attract mode options */
export interface IAttract {
  /** Attract distance in pixels */
  distance: number;
  /** Attract animation duration in seconds */
  duration: number;
  /** Attract animation easing type */
  easing: EasingType | EasingTypeAlt;
  /** Attract factor multiplier */
  factor: number;
  /** Maximum attract speed */
  maxSpeed: number;
  /** Attract speed */
  speed: number;
}
