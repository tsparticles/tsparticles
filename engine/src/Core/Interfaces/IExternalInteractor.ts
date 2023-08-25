import type { ClickMode } from "../../Enums/Modes/ClickMode.js";
import type { IDelta } from "./IDelta.js";
import type { IInteractor } from "./IInteractor.js";
import type { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes.js";
import type { Modes } from "../../Options/Classes/Interactivity/Modes/Modes.js";
import type { Particle } from "../Particle.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    loadModeOptions?: (options: Modes, ...sources: RecursivePartial<IModes | undefined>[]) => void;

    interact(delta: IDelta): Promise<void>;

    isEnabled(particle?: Particle): boolean;
}
