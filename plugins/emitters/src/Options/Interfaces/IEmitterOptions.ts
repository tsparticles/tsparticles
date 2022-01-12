import type { IInteractivity, IModes, SingleOrMultiple } from "tsparticles-engine";
import type { IEmitter } from "./IEmitter";

/**
 * @category Emitters Plugin
 */
export interface IEmitterOptions {
    emitters: SingleOrMultiple<IEmitter>;
    interactivity: IInteractivity & {
        modes: IModes & {
            emitters: SingleOrMultiple<IEmitter>;
        };
    };
}
