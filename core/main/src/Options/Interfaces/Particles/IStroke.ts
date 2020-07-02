import type { IAnimatableColor } from "./IAnimatableColor";

export interface IStroke {
    color?: string | IAnimatableColor;
    opacity?: number;
    width: number;
}
