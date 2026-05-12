import type { IValueWithRandom, RangeValue } from "@tsparticles/engine";

/** Particles repulse options */
export interface IParticlesRepulse extends IValueWithRandom {
  /** Repulse distance */
  distance: RangeValue;
  /** Repulse duration */
  duration: RangeValue;
  /** Enables particle repulse */
  enabled: boolean;
  /** Repulse factor */
  factor: RangeValue;
  /** Repulse speed */
  speed: RangeValue;
}
