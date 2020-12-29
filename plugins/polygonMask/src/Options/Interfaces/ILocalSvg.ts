import type { SingleOrMultiple } from "tsparticles-core/Types";
import type { IDimension } from "tsparticles-core/Core/Interfaces/IDimension";

/**
 * @category Polygon Mask Plugin
 */
export interface ILocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
