import type { LimitMode } from "../../../../Enums/Modes/LimitMode.js";

/** Particles number limit options */
export interface IParticlesNumberLimit {
  /**
   * The mode of handling the limit
   */
  mode: LimitMode | keyof typeof LimitMode;

  /**
   * The maximum number of particles
   */
  value: number;
}
