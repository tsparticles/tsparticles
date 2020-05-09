import type { IOptionLoader } from "../IOptionLoader";

export interface IAbsorberRandomSize extends IOptionLoader<IAbsorberRandomSize> {
    enable: boolean;
    minimumValue: number;
}
