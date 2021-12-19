import type { SingleOrMultiple } from "tsparticles-engine";
import type { IDimension } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
