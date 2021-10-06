import type { SingleOrMultiple } from "tsparticles-engine";
import type { IEmitter } from "./IEmitter";
import type { IInteractivity } from "tsparticles-engine/Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IModes";

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
