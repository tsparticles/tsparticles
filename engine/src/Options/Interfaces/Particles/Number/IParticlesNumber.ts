import type { IParticlesDensity } from "./IParticlesDensity.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export interface IParticlesNumber {
    density: IParticlesDensity;
    limit: number;
    value: number;
}
