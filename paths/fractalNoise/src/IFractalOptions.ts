import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";

export interface IFractalOptions {
    columns: number;
    draw: boolean;
    factor: IFactorValues;
    height: number;
    increment: number;
    offset: IOffsetValues;
    rows: number;
    // seed?: number;
    size: number;
    width: number;
}
