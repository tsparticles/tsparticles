import type { INoiseRandom } from "./INoiseRandom";
import type { IOptionLoader } from "../../IOptionLoader";

export interface INoiseDelay extends IOptionLoader<INoiseDelay> {
    value: number;
    random: INoiseRandom;
}
