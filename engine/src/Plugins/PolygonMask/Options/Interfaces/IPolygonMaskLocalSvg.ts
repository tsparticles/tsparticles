import type { SingleOrMultiple } from "../../../../Types";
import type { IDimension } from "../../../../Core";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
