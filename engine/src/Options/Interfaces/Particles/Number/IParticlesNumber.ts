import type { IParticlesDensity } from "./IParticlesDensity";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export interface IParticlesNumber {
    /**
     * @deprecated the property max is deprecated, use the new limit instead
     */
    max: number;

    density: IParticlesDensity;
    limit: number;
    value: number;
}
