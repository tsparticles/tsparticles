import type { IDelta, Particle, RecursivePartial } from "@tsparticles/engine";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";
import type { IModes } from "./Options/Interfaces/Modes/IModes.js";
import type { Modes } from "./Options/Classes/Modes/Modes.js";

/**
 */
export interface IExternalInteractor<TParticle extends Particle = Particle> extends IInteractor<TParticle> {
  handleClickMode?: (mode: string, interactivityData: IInteractivityData) => void;

  loadModeOptions?: (options: Modes, ...sources: RecursivePartial<IModes | undefined>[]) => void;

  interact(interactivityData: IInteractivityData, delta: IDelta): void;

  isEnabled(interactivityData: IInteractivityData, particle?: TParticle): boolean;
}
