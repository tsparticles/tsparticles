import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";
import type { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
import type { Modes } from "../../Options/Classes/Interactivity/Modes/Modes";
import type { Particle } from "../Particle";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    loadModeOptions?: (options: Modes, ...sources: RecursivePartial<IModes | undefined>[]) => void;

    interact(delta: IDelta): Promise<void>;

    isEnabled(particle?: Particle): boolean;
}
