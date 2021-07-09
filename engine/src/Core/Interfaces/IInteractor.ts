import type { Particle } from "../Particle";
import type { InteractorType } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IInteractor {
    type: InteractorType;

    reset(particle: Particle): void;
}
