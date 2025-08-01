import type { IOffsetValues } from "./IOffsetValues.js";

export interface IFractalOptions {
    columns: number;
    height: number;
    increment: number;
    layers: number;
    offset: IOffsetValues;
    rows: number;
    seed?: number;
    size: number;
    width: number;
}
