import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IInteractor {
    reset(particle: Particle): void;
}
