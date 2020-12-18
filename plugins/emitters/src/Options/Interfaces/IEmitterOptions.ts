import type { SingleOrMultiple } from "tsparticles/Types";
import type { IEmitter } from "./IEmitter";
import type { IInteractivity } from "tsparticles/Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "tsparticles/Options/Interfaces/Interactivity/Modes/IModes";

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
