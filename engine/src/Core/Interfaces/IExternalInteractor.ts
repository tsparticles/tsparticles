import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    isEnabled(): boolean;

    interact(delta: IDelta): void;
}
