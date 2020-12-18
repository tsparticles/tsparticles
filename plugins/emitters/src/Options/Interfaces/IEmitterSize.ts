import type { SizeMode } from "tsparticles/Enums";
import type { IDimension } from "tsparticles/Core/Interfaces/IDimension";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
