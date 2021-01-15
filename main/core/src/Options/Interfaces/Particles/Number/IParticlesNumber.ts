import type { IDensity } from "./IDensity";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export interface IParticlesNumber {
    /**
     * @deprecated the property max is deprecated, use the new limit instead
     */
    max: number;

    density: IDensity;
    limit: number;
    value: number;
}
