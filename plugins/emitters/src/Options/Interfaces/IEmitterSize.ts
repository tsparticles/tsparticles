import type { IDimension, SizeMode } from "tsparticles-engine";

/**
 
 */
export interface IEmitterSize extends IDimension {
    mode: SizeMode | keyof typeof SizeMode;
}
