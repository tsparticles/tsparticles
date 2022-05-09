import type { IEmitter } from "./IEmitter";
import type { IEmitterModeRandomOptions } from "./IEmitterModeRandomOptions";
import type { SingleOrMultiple } from "tsparticles-engine";

/**
 * @category Emitters Plugin
 */
export interface IEmitterModeOptions {
    random: IEmitterModeRandomOptions;
    value: SingleOrMultiple<IEmitter>;
}
