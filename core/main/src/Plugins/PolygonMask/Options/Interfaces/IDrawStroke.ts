import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
