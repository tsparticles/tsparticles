import type { SingleOrMultiple } from "../../../../Types";
import type { IAbsorber } from "./IAbsorber";
import type { IInteractivity } from "../../../../Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "../../../../Options/Interfaces/Interactivity/Modes/IModes";

/**
 * @category Absorbers Plugin
 */
export interface IAbsorberOptions {
    absorbers: SingleOrMultiple<IAbsorber>;
    interactivity: IInteractivity & {
        modes: IModes & {
            absorbers: SingleOrMultiple<IAbsorber>;
        };
    };
}
