import type { RangeValue, SingleOrMultiple } from "@tsparticles/engine";

/** Particles options interface */
export interface IParticlesOptions {
  /** Enables particle collisions */
  collisions?: boolean;
  /** Particle color */
  color?: string;
  /** Number of particles */
  count?: number;
  /** Enables particle links */
  links?: boolean;
  /** Links color */
  linksColor?: string;
  /** Links distance */
  linksLength?: number;
  /** Particle opacity */
  opacity?: number;
  /** Particle radius */
  radius?: RangeValue;
  /** Particle shape */
  shape?: SingleOrMultiple<string>;
  /** Particle speed */
  speed?: RangeValue;
}
