import type { InteractorType } from "../../Enums";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IInteractor {
    type: InteractorType;

    reset(particle: Particle): void;
}
