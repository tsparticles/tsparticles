import type { IAbsorberRandomSize } from "./IAbsorberRandomSize";

export interface IAbsorberSize {
    limit?: number;
    random: boolean | IAbsorberRandomSize;
    value: number;
    density: number;
}
