/** Restore behavior options after attract interaction */
export interface IAttractRestore {
  /** Delay in seconds before restoring starts */
  delay: number;
  /** Enable restoring particles to their pre-attract trajectory */
  enable: boolean;
  /** Follow the particle natural movement while it is interacting */
  follow: boolean;
  /** Restore interpolation factor (0..1) applied per frame */
  speed: number;
}

/** Attract mode options */
export interface IAttract {
  /** Attract distance in pixels */
  distance: number;
  /** Attract animation duration in seconds */
  duration: number;
  /** Attract animation easing type */
  easing: string;
  /** Attract factor multiplier */
  factor: number;
  /** Maximum attract speed */
  maxSpeed: number;
  /** Restore behavior after particles leave attract influence */
  restore: IAttractRestore;
  /** Attract speed */
  speed: number;
}
