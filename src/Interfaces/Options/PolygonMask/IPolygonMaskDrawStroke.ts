import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../Particles/IColor";

export interface IPolygonMaskDrawStroke extends IOptionLoader<IPolygonMaskDrawStroke> {
    color: string | IColor;
    width: number;
}
