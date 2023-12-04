import type { LimitMode } from "../../../../Enums/Modes/LimitMode.js";

export interface IParticlesNumberLimit {
    mode: LimitMode | keyof typeof LimitMode;
    value: number;
}
