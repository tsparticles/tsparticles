import type { IColor } from "../../../../Core/Interfaces/IColor";

/**
 * @category Polygon Mask Plugin
 */
export interface IDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
