import type { IParticlesDensity } from "./IParticlesDensity.js";
import type { IParticlesNumberLimit } from "./IParticlesNumberLimit.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export interface IParticlesNumber {
    density: IParticlesDensity;
    limit: IParticlesNumberLimit;
    value: number;
}
