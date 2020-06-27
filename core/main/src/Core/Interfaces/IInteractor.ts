import type { Particle } from "../Particle";

export interface IInteractor {
    reset(particle: Particle): void;
}
