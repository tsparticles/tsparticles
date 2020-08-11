import type { ILifeDurationRandom } from "./ILifeDurationRandom";

export interface ILifeDuration {
    value: number;
    random: ILifeDurationRandom;
    sync: boolean;
}
