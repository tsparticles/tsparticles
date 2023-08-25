import type { ILifeDelay } from "./ILifeDelay.js";
import type { ILifeDuration } from "./ILifeDuration.js";

export interface ILife {
    count: number;
    delay: ILifeDelay;
    duration: ILifeDuration;
}
