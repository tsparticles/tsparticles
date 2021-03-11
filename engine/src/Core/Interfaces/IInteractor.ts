import type { Particle } from "../Particle";
import type { InteractorType } from "../../Enums/Types/InteractorType";

/**
 * @category Interfaces
 */
export interface IInteractor {
    type: InteractorType;

    reset(particle: Particle): void;
}
