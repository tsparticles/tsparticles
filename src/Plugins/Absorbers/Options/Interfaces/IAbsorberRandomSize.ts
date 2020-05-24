import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";

export interface IAbsorberRandomSize extends IOptionLoader<IAbsorberRandomSize> {
    enable: boolean;
    minimumValue: number;
}
