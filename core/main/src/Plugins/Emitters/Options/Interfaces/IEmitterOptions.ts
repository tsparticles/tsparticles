import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { IEmitter } from "./IEmitter";
import { IInteractivity } from "../../../../Options/Interfaces/Interactivity/IInteractivity";
import { IModes } from "../../../../Options/Interfaces/Interactivity/Modes/IModes";

export interface IEmitterOptions {
    emitters: SingleOrMultiple<IEmitter>;
    interactivity: IInteractivity & {
        modes: IModes & {
            emitters: SingleOrMultiple<IEmitter>;
        };
    };
}
