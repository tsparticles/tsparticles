import type { IPolygonMaskDrawStroke } from "./IPolygonMaskDrawStroke";
import type { IColor } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskDraw {
    enable: boolean;

    stroke: IPolygonMaskDrawStroke;
}
