/** Restore behavior options after repulse interaction */
export interface IRepulseRestore {
  /** Delay in seconds before restoring starts */
  delay: number;
  /** Enable restoring particles to their pre-repulse trajectory */
  enable: boolean;
  /** Follow the particle natural movement while it is interacting */
  follow: boolean;
  /** Restore interpolation factor (0..1) applied per frame */
  speed: number;
}

/**
 * Repulse mode base options
 */
export interface IRepulseBase {
  /** Repulse distance in pixels */
  distance: number;
  /** Repulse animation duration in seconds */
  duration: number;
  /** Repulse animation easing type */
  easing: string;
  /** Repulse factor multiplier */
  factor: number;
  /** Maximum repulse speed */
  maxSpeed: number;
  /** Restore behavior after particles leave repulse influence */
  restore: IRepulseRestore;
  /** Repulse speed */
  speed: number;
}
