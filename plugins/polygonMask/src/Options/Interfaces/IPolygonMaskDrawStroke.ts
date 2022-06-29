import type { IOptionsColor } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDrawStroke {
    color: string | IOptionsColor;
    opacity: number;
    width: number;
}
