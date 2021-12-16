import type { IDensity } from "./IDensity";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export interface IParticlesNumber {
    density: IDensity;
    limit: number;
    value: number;
}
