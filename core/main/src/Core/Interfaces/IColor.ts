import type { IValueColor } from "./IValueColor";
import type { IRgb } from "./IRgb";
import type { IHsl } from "./IHsl";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

export interface IColor {
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | string>;
}
