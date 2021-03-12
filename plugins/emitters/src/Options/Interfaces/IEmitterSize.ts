import type { SizeMode } from "tsparticles-engine/Enums";
import type { IDimension } from "tsparticles-engine/Core/Interfaces/IDimension";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
