import type { SizeMode } from "tsparticles-engine";
import type { IDimension } from "tsparticles-engine";

/**
 * @category Emitters Plugin
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
