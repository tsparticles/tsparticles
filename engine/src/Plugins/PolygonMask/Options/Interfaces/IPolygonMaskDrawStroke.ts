import type { IColor } from "../../../../Core";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDrawStroke {
    color: string | IColor;
    width: number;
    opacity: number;
}
