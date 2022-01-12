import type { IColor } from "../../../../Core";
import type { IPolygonMaskDrawStroke } from "./IPolygonMaskDrawStroke";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDraw {
    enable: boolean;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.color property
     */
    lineColor: string | IColor;

    /**
     * @deprecated the property lineColor is deprecated, please use the new stroke.width property
     */
    lineWidth: number;

    stroke: IPolygonMaskDrawStroke;
}
