import type { IValueColor } from "../../IValueColor";
import type { IOptionLoader } from "../IOptionLoader";
import type { IHsl } from "../../IHsl";
import type { IRgb } from "../../IRgb";

export interface IColor extends IOptionLoader<IColor> {
    value: string | IValueColor | IRgb | IHsl | string[];
}
