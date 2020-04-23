import type { IOptionLoader } from "../IOptionLoader";

export interface IBlackHoleRandomSize extends IOptionLoader<IBlackHoleRandomSize> {
    enable: boolean;
    minimumValue: number;
}
