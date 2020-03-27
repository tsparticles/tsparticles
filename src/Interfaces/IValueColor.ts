import type { IHsl } from "./IHsl";
import type { IRgb } from "./IRgb";

export interface IValueColor {
    rgb?: IRgb | null;
    hsl?: IHsl | null;
}
