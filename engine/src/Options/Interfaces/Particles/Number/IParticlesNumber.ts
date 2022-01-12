import type { IParticlesDensity } from "./IParticlesDensity";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export interface IParticlesNumber {
    density: IParticlesDensity;
    limit: number;
    value: number;
}
