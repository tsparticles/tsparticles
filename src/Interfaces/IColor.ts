import { IValueColor } from "./IValueColor";
import { IRgb } from "./IRgb";
import { IHsl } from "./IHsl";

export interface IColor {
	value: string | IValueColor | IRgb | IHsl | string[];
}