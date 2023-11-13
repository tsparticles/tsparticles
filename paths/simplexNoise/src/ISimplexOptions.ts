import type { IOffsetValues } from "./IOffsetValues.js";

export interface ISimplexOptions {
    columns: number;
    height: number;
    increment: number;
    layers: number;
    offset: IOffsetValues;
    rows: number;
    size: number;
    width: number;
}
