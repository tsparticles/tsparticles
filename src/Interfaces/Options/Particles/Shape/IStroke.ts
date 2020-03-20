import {IOptionLoader} from "../../IOptionLoader";
import {IColor} from "../IColor";

export interface IStroke extends IOptionLoader<IStroke> {
    width: number;
    color: string | IColor;
}
