import {IHsl} from "./IHsl";
import {IRgb} from "./IRgb";

export interface IValueColor {
    rgb?: IRgb | null;
    hsl?: IHsl | null;
}
