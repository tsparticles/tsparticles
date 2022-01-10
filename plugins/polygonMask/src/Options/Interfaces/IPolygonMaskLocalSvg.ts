import type { IDimension, SingleOrMultiple } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
