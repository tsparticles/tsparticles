import type { SingleOrMultiple } from "tsparticles-engine";
import type { IAbsorber } from "./IAbsorber";
import type { IInteractivity } from "tsparticles-engine/Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "tsparticles-engine/Options/Interfaces/Interactivity/Modes/IModes";

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
