import type { IDelta, Particle, RecursivePartial } from "@tsparticles/engine";
import type { IInteractivityParticlesOptions, InteractivityParticlesOptions } from "../types.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";

/**
 */
export interface IParticleInteractorBase<TParticle extends Particle = Particle> extends IInteractor {
  loadParticlesOptions?: (
    options: InteractivityParticlesOptions,
    ...sources: (RecursivePartial<IInteractivityParticlesOptions> | undefined)[]
  ) => void;

  clear(particle: TParticle, delta: IDelta): void;

  reset(interactivityData: IInteractivityData, particle: TParticle): void;
}
