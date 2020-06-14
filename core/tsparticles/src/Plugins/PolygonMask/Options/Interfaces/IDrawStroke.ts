import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IDrawStroke extends IOptionLoader<IDrawStroke> {
    color: string | IColor;
    width: number;
    opacity: number;
}
