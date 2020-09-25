import type { IRandom } from "./IRandom";

export interface IValueWithRandom {
    value: number;
    random: boolean | IRandom;
}
