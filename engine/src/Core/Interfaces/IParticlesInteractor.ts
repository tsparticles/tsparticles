import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";
import type { Particle } from "../Particle";

/**
 */
export interface IParticlesInteractor extends IInteractor {
    interact(particle: Particle, delta: IDelta): Promise<void>;

    isEnabled(particle: Particle): boolean;
}
