import type { IPolygonMask } from "./IPolygonMask";
import { IOptions } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};
