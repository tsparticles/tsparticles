import type { IOptionLoader } from "../IOptionLoader";
import type { IBlackHoleRandomSize } from "./IBlackHoleRandomSize";

export interface IBlackHoleSize extends IOptionLoader<IBlackHoleSize> {
    limit?: number;
    random: boolean | IBlackHoleRandomSize;
    value: number;
}
