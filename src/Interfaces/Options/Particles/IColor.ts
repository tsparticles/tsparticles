import {IValueColor} from "../../IValueColor";
import {IOptionLoader} from "../IOptionLoader";
import {IHsl} from "../../IHsl";
import {IRgb} from "../../IRgb";

export interface IColor extends IOptionLoader<IColor> {
    value: string | IValueColor | IRgb | IHsl | string[];
}
