import type { IParticlesOptions, RecursivePartial } from "@tsparticles/engine";

/** The interactivity particle options */
export interface IInteractivityParticleOptions {
  /** The particle options to use when spawning */
  options?: RecursivePartial<IParticlesOptions>;
  /** Pause the animation when the mouse stops interacting */
  pauseOnStop: boolean;
  /** Replace the cursor with the particle image */
  replaceCursor: boolean;
  /** The delay before stopping the animation */
  stopDelay: number;
}
