import type { IOptionLoader } from "../../IOptionLoader";

export interface INoiseRandom extends IOptionLoader<INoiseRandom> {
    enable: boolean;
    minimumValue: number;
}
