import type { IValueColor } from "./IValueColor";
import type { IRgb } from "./IRgb";
import type { IHsl } from "./IHsl";

export interface IColor {
    value: string | IValueColor | IRgb | IHsl | string[];
}