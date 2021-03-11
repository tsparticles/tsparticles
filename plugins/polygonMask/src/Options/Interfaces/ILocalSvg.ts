import type { SingleOrMultiple } from "tsparticles-engine/Types";
import type { IDimension } from "tsparticles-engine/Core/Interfaces/IDimension";

/**
 * @category Polygon Mask Plugin
 */
export interface ILocalSvg {
    path: SingleOrMultiple<string>;
    size: IDimension;
}
