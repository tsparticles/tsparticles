import type { IOptionLoader } from "../../IOptionLoader";

export interface IOpacityRandom extends IOptionLoader<IOpacityRandom> {
    enable: boolean;
    minimumValue: number;
}
