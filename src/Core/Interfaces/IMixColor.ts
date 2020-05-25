import type { IRgb } from "./IRgb";
import type { IHsl } from "./IHsl";

export interface IMixColor {
    color: IRgb | IHsl;
    size: number;
}
