import type { IInfectionStage } from "./IInfectionStage";

/**
 * The particles infection animations options
 * [[include:Options/Infection.md]]
 * @category Options
 */
export interface IInfection {
    /**
     * This property specifies if particles can turn back to the original state after being infected
     */
    cure: boolean;

    /**
     * The infection delay of the new infected particles, initial infected particles won't be affected.
     */
    delay: number;

    /**
     * Enables the infection animations
     */
    enable: boolean;

    /**
     * This property contains all the infection stages configurations, array of [[IInfectionStage]]
     */
    stages: IInfectionStage[];

    /**
     * The initial number of infected particles
     */
    infections: number;
}
