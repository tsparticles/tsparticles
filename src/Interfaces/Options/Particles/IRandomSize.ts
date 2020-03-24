import type { IOptionLoader } from "../IOptionLoader";

export interface IRandomSize extends IOptionLoader<IRandomSize> {
    enable: boolean;
    minimumValue: number;
}
