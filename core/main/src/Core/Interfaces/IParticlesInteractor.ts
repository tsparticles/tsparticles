import type { Particle } from "../Particle";
import type { IInteractor } from "./IInteractor";
import { IDelta } from "./IDelta";

export interface IParticlesInteractor extends IInteractor {
    isEnabled(particle: Particle): boolean;

    interact(particle: Particle, delta: IDelta): void;
}
