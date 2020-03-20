import {IOptionLoader} from "../IOptionLoader";
import {IColor} from "../Particles/IColor";

export interface IPolygonMaskDrawStroke extends IOptionLoader<IPolygonMaskDrawStroke> {
    color: string | IColor;
    width: number;
}
