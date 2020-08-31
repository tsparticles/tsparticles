import type { IValueColor } from "./IValueColor";
import type { IRgb } from "./IRgb";
import type { IHsl } from "./IHsl";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

/**
 * Color
 * @category Interfaces
 */
export interface IColor {
    /**
     * Color value, can be a single or an array of [[IValueColor]], [[IRgb]], [[IHsl]] or string
     */
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | string>;
}
