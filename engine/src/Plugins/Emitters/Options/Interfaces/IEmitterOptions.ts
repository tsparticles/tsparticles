import type { IEmitter } from "./IEmitter";
import type { IInteractivity } from "../../../../Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "../../../../Options/Interfaces/Interactivity/Modes/IModes";
import type { SingleOrMultiple } from "../../../../Types";

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
