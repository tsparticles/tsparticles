import type { IDimension } from "../../../../Core";
import type { SingleOrMultiple } from "../../../../Types";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
