import type { ILifeDelay } from "./ILifeDelay";
import type { ILifeDuration } from "./ILifeDuration";

export interface ILife {
    count: number;
    delay: ILifeDelay;
    duration: ILifeDuration;
}
