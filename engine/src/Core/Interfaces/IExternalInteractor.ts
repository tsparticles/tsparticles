import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";
import type { Particle } from "../Particle";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    isEnabled(particle?: Particle): boolean;

    interact(delta: IDelta): Promise<void>;
}
