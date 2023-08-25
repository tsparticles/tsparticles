import type { IDelta } from "./IDelta.js";
import type { IInteractor } from "./IInteractor.js";
import type { Particle } from "../Particle.js";

/**
 */
export interface IParticlesInteractor extends IInteractor {
    interact(particle: Particle, delta: IDelta): Promise<void>;

    isEnabled(particle: Particle): boolean;
}
