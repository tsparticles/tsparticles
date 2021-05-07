import type { SingleOrMultiple } from "../../../../Types";
import type { IRepulser } from "./IRepulser";
import type { IInteractivity } from "../../../../Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "../../../../Options/Interfaces/Interactivity/Modes/IModes";

/**
 * @category Absorbers Plugin
 */
export interface IRepulserOptions {
    repulsers: SingleOrMultiple<IRepulser>;
    interactivity: IInteractivity & {
        modes: IModes & {
            repulsers: SingleOrMultiple<IRepulser>;
        };
    };
}
