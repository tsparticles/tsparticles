import type { IParticlesDensity } from "./IParticlesDensity";

/**
 * [[include:Options/Particles/Number.md]]
 *
 
 */
export interface IParticlesNumber {
    density: IParticlesDensity;
    limit: number;

    /**
     * @deprecated the property max is deprecated, use the new limit instead
     */
    max: number;

    value: number;
}
