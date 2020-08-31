import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IDimension } from "../../../../Core/Interfaces/IDimension";

/**
 * @category Polygon Mask Plugin
 */
export interface ILocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
