/** Particle life cycle data */
export interface IParticleLife {
  /** Number of times the particle has been reset */
  count: number;
  /** Delay before the particle starts */
  delay: number;
  /** Delay time value in seconds */
  delayTime: number;
  /** Total duration of the particle life */
  duration: number;
  /** Elapsed time in the current life cycle */
  time: number;
}
