import type { SizeMode } from "tsparticles-core/Enums";
import type { IDimension } from "tsparticles-core/Core/Interfaces/IDimension";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
