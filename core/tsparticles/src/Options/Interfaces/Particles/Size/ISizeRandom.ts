import type { IOptionLoader } from "../../IOptionLoader";

export interface ISizeRandom extends IOptionLoader<ISizeRandom> {
    enable: boolean;
    minimumValue: number;
}
