import type { IPolygonMaskDrawStroke } from "./IPolygonMaskDrawStroke";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDraw {
    enable: boolean;

    stroke: IPolygonMaskDrawStroke;
}
