import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../IColor";

export interface IStroke extends IOptionLoader<IStroke> {
    width: number;
    color: string | IColor;
}
