import type { IDelta } from "./IDelta";
import { ClickMode } from "../../Enums";
import type { IInteractor } from "./IInteractor";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    isEnabled(): boolean;

    interact(delta: IDelta): void;
}
