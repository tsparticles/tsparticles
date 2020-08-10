import type { ILifeDelayRandom } from "./ILifeDelayRandom";

export interface ILifeDelay {
    value: number;
    random: ILifeDelayRandom;
    sync: boolean;
}
