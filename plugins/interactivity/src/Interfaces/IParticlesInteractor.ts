import type { IDelta, Particle } from "@tsparticles/engine";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IParticleInteractorBase } from "./IParticleInteractorBase.js";

/**
 */
export interface IParticlesInteractor<
  TParticle extends Particle = Particle,
> extends IParticleInteractorBase<TParticle> {
  interact(particle: TParticle, interactivityData: IInteractivityData, delta: IDelta): void;

  isEnabled(particle: TParticle, interactivityData: IInteractivityData): boolean;
}
