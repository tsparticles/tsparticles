import type { IParticlesOptions, RecursivePartial } from "@tsparticles/engine";

/**
 */
export interface IInteractivityParticle {
    options?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    replaceCursor: boolean;
    stopDelay: number;
}
