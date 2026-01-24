import type { IParticlesDensity } from "./IParticlesDensity.js";
import type { IParticlesNumberLimit } from "./IParticlesNumberLimit.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export interface IParticlesNumber {
  /**
   * Particles density options
   */
  density: IParticlesDensity;

  /**
   * Particles number limit options
   */
  limit: IParticlesNumberLimit;

  /**
   * The number of particles to be rendered
   */
  value: number;
}
