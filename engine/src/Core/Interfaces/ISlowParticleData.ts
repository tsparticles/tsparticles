/** Slow effect data for a particle */
export interface ISlowParticleData {
  /** Slow factor applied to the particle */
  factor: number;
  /** Whether the particle is within slow range */
  inRange: boolean;
}
