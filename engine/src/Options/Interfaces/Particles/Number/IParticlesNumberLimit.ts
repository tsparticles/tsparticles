import type { LimitMode } from "../../../../Enums/Modes/LimitMode.js";

export interface IParticlesNumberLimit {
    /**
     * The mode of handling the limit
     */
    mode: LimitMode | keyof typeof LimitMode;

    /**
     * The maximum number of particles
     */
    value: number;
}
