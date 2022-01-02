import type { IColor } from "../../../../Core/Interfaces";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
