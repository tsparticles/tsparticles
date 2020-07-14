import type { IInteractor } from "./IInteractor";
import { IDelta } from "./IDelta";

export interface IExternalInteractor extends IInteractor {
    isEnabled(): boolean;

    interact(delta: IDelta): void;
}
