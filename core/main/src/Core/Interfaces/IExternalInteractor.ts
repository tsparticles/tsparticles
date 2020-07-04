import type { IInteractor } from "./IInteractor";

export interface IExternalInteractor extends IInteractor {
    isEnabled(): boolean;

    interact(delta: number): void;
}
