import type { IDelta } from "./IDelta";
import type { IInteractor } from "./IInteractor";

/**
 * @category Interfaces
 */
export interface IExternalInteractor extends IInteractor {
    interact(delta: IDelta): void;

    isEnabled(): boolean;
}
