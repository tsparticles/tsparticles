import type { IDelta } from "./IDelta.js";
import type { IInteractor } from "./IInteractor.js";
import type { Particle } from "../Particle.js";

/**
 */
export interface IParticlesInteractor<TParticle extends Particle = Particle> extends IInteractor<TParticle> {
    interact(particle: TParticle, delta: IDelta): void;

    isEnabled(particle: TParticle): boolean;
}
