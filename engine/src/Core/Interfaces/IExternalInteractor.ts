import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    isEnabled(): boolean;

    interact(delta: IDelta): Promise<void>;
}
