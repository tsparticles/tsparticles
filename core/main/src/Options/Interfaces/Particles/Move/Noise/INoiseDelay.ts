import type { INoiseRandom } from "./INoiseRandom";

/**
 * @category Options
 */
export interface INoiseDelay {
    value: number;
    random: INoiseRandom;
}
