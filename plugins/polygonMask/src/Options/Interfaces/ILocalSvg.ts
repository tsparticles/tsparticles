import type { SingleOrMultiple } from "tsparticles/Types";
import type { IDimension } from "tsparticles/Core/Interfaces/IDimension";

/**
 * @category Polygon Mask Plugin
 */
export interface ILocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
