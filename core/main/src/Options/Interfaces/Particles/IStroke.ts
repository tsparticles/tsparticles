import type { IOptionLoader } from "../IOptionLoader";
import type { IAnimatableColor } from "./IAnimatableColor";

export interface IStroke extends IOptionLoader<IStroke> {
    color?: string | IAnimatableColor;
    opacity?: number;
    width: number;
}
