import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../../IColor";

export interface IPolygonMaskDrawStroke extends IOptionLoader<IPolygonMaskDrawStroke> {
    color: string | IColor;
    width: number;
    opacity: number;
}
