import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../../IColor";

export interface IStroke extends IOptionLoader<IStroke> {
    color: string | IColor;
    opacity: number;
    width: number;
}
