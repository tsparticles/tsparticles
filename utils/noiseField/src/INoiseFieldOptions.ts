import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";

export interface INoiseFieldOptions {
    columns: number;
    draw: boolean;
    factor: IFactorValues;
    height: number;
    increment: number;
    layers: number;
    offset: IOffsetValues;
    rows: number;
    seed?: number;
    size: number;
    width: number;
}
