import type { IDelta, Particle } from "@tsparticles/engine";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";

/**
 */
export interface IParticlesInteractor<TParticle extends Particle = Particle> extends IInteractor<TParticle> {
    interact(particle: TParticle, interactivityData: IInteractivityData, delta: IDelta): void;

    isEnabled(particle: TParticle, interactivityData: IInteractivityData): boolean;
}
