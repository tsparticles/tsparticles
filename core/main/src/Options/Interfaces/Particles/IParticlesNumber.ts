import type { IDensity } from "./IDensity";

/**
 * @category Options
 */
export interface IParticlesNumber {
    density: IDensity;
    limit: number;

    /**
     * @deprecated the property max is deprecated, use the new limit instead
     */
    max: number;

    value: number;
}
