import type { IOptionLoader } from "../IOptionLoader";

export interface IRandomOpacity extends IOptionLoader<IRandomOpacity> {
    enable: boolean;
    minimumValue: number;
}
