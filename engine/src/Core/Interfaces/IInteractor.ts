import type { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IInteractor {
    type: InteractorType;

    init(): void;

    reset(particle: Particle): void;

    clear(particle: Particle): void;
}
