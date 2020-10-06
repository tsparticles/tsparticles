import type { Particle } from "../Particle";
import type { IInteractor } from "./IInteractor";
import type { IDelta } from "./IDelta";

/**
 * @category Interfaces
 */
export interface IParticlesInteractor extends IInteractor {
    isEnabled(particle: Particle): boolean;

    interact(particle: Particle, delta: IDelta): void;
}
