import type { IInteractor } from "./IInteractor";
import type { IDelta } from "./IDelta";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    isEnabled(): boolean;

    interact(delta: IDelta): void;
}
