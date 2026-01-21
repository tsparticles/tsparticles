import type { ICoordinatesWithMode, IParticlesOptions, RecursivePartial } from "@tsparticles/engine";

/**
 * Manual particles options
 * [[include:Options/ManualParticles.md]]
 */
export interface IManualParticle {
    /**
     * Particle options, this properties will override the general particles configuration
     */
    options?: RecursivePartial<IParticlesOptions>;

    /**
     * Particle position in canvas size percent, if undefined a random position will be used
     */
    position?: ICoordinatesWithMode;
}
