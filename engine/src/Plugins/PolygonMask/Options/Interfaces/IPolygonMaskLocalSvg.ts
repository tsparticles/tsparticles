import type { IDimension } from "../../../../Core/Interfaces/IDimension";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Polygon Mask Plugin
 */
export interface IPolygonMaskLocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
