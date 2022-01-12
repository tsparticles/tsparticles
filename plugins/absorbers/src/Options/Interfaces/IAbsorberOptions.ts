import type { IInteractivity, IModes, SingleOrMultiple } from "tsparticles-engine";
import type { IAbsorber } from "./IAbsorber";

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
