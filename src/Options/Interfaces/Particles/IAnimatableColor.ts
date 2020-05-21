import type { IOptionsColor } from "../IOptionsColor";
import type { IColorAnimation } from "./IColorAnimation";

export interface IAnimatableColor extends IOptionsColor {
    animation: IColorAnimation;
}
