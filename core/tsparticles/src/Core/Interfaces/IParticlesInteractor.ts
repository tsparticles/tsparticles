import type { Particle } from "../Particle";
import type { IInteractor } from "./IInteractor";

export interface IParticlesInteractor extends IInteractor {
    isEnabled(particle: Particle): boolean;

    interact(particle: Particle, delta: number): void;
}
