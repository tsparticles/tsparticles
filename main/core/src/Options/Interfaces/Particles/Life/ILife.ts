import type { ILifeDelay } from "./ILifeDelay";
import type { ILifeDuration } from "./ILifeDuration";

/**
 * @category Options
 * [[include:Options/Particles/Life.md]]
 */
export interface ILife {
    count: number;
    delay: ILifeDelay;
    duration: ILifeDuration;
}
