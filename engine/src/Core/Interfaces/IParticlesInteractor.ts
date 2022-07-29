import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IParticlesInteractor extends IInteractor {
    interact(particle: Particle, delta: IDelta): Promise<void>;

    isEnabled(particle: Particle): boolean;

    particleInteract(p1: Particle, p2: Particle, delta: IDelta): Promise<void>;
}
