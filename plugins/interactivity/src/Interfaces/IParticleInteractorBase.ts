import type { IDelta, IParticlesOptions, Particle, ParticlesOptions, RecursivePartial } from "@tsparticles/engine";
import type { IInteractivity } from "../Options/Interfaces/IInteractivity.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";

type IInteractivityParticlesOptions = IParticlesOptions & {
  interactivity?: RecursivePartial<IInteractivity>;
};

type InteractivityParticlesOptions = RecursivePartial<ParticlesOptions> & {
  interactivity?: RecursivePartial<IInteractivity>;
};

/** Particle interactor base interface */
export interface IParticleInteractorBase<TParticle extends Particle = Particle> extends IInteractor {
  /** Loads particles options from source options */
  loadParticlesOptions?: (
    options: InteractivityParticlesOptions,
    ...sources: (RecursivePartial<IInteractivityParticlesOptions> | undefined)[]
  ) => void;

  /** Clears the interactor state for a particle */
  clear(particle: TParticle, delta: IDelta): void;

  /** Resets the interactor state for a particle */
  reset(interactivityData: IInteractivityData, particle: TParticle): void;
}
