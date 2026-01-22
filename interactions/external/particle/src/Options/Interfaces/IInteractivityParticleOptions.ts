import type { IParticlesOptions, RecursivePartial } from "@tsparticles/engine";

/**
 */
export interface IInteractivityParticleOptions {
  options?: RecursivePartial<IParticlesOptions>;
  pauseOnStop: boolean;
  replaceCursor: boolean;
  stopDelay: number;
}
