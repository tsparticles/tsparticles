import type { IAbsorberRandomSize } from "./IAbsorberRandomSize";

/**
 * @category Absorbers Plugin
 */
export interface IAbsorberSize {
    limit?: number;
    random: boolean | IAbsorberRandomSize;
    value: number;
    density: number;
}
