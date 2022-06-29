import type { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IInteractor {
    type: InteractorType;

    clear(particle: Particle): void;

    init(): void;

    reset(particle: Particle): void;
}
