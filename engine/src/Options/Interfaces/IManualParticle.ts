import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IParticlesOptions } from "./Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * Manual particles options
 * [[include:Options/ManualParticles.md]]
 * @category options
 */
export interface IManualParticle {
    /**
     * Particle position in canvas size percent, if undefined a random position will be used
     */
    position?: ICoordinates;

    /**
     * Particle options, this properties will override the general particles configuration
     */
    options?: RecursivePartial<IParticlesOptions>;
}
