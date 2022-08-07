import type { IParticlesOptions, RecursivePartial } from "tsparticles-engine";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
