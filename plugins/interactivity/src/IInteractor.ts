import type { IDelta, ISourceOptions, Options, Particle, RecursivePartial } from "@tsparticles/engine";
import type { IInteractivityParticlesOptions, InteractivityParticlesOptions } from "./types.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { InteractorType } from "./InteractorType.js";

/**
 */
export interface IInteractor<TParticle extends Particle = Particle> {
  loadOptions?: (options: Options, ...sources: (ISourceOptions | undefined)[]) => void;

  loadParticlesOptions?: (
    options: InteractivityParticlesOptions,
    ...sources: (RecursivePartial<IInteractivityParticlesOptions> | undefined)[]
  ) => void;

  type: InteractorType;

  clear(particle: TParticle, delta: IDelta): void;

  init(): void;

  reset(interactivityData: IInteractivityData, particle: TParticle): void;
}
