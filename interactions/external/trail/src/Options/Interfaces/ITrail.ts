import type { IParticlesOptions, RecursivePartial } from "tsparticles-engine";

/**
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
