import type { IOptionLoader } from "../IOptionLoader";
import type { IAbsorberRandomSize } from "./IAbsorberRandomSize";

export interface IAbsorberSize extends IOptionLoader<IAbsorberSize> {
    limit?: number;
    random: boolean | IAbsorberRandomSize;
    value: number;
}
