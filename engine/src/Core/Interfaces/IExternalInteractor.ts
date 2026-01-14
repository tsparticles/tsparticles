import type { IDelta } from "./IDelta.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";
import type { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes.js";
import type { Modes } from "../../Options/Classes/Interactivity/Modes/Modes.js";
import type { Particle } from "../Particle.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 */
export interface IExternalInteractor<TParticle extends Particle = Particle> extends IInteractor<TParticle> {
    handleClickMode?: (mode: string, interactivityData: IInteractivityData) => void;

    loadModeOptions?: (options: Modes, ...sources: RecursivePartial<IModes | undefined>[]) => void;

    interact(interactivityData: IInteractivityData, delta: IDelta): void;

    isEnabled(interactivityData: IInteractivityData, particle?: TParticle): boolean;
}
