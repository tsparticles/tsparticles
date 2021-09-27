import type { IInteractor } from "./IInteractor";
import type { IDelta } from "./IDelta";
import { ClickMode } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    handleClickMode?: (mode: ClickMode | string) => void;

    isEnabled(): boolean;

    interact(delta: IDelta): void;
}
