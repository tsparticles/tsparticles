import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";

export interface IPerlinOptions {
    columns: number;
    draw: boolean;
    factor: IFactorValues,
    height: number;
    increment: number;
    offset: IOffsetValues,
    rows: number;
    size: number;
    width: number;
}
