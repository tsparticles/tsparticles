import type { IPolygonMask } from "./IPolygonMask";
import { IOptions } from "tsparticles-core";

/**
 * @category Polygon Mask Plugin
 */
export type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};
