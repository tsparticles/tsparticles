import type { Container } from "../../../../Core/Container";
import type { Engine } from "../../../../Core/Engine";
import type { IExternalInteractor } from "../../../../Core/Interfaces/IExternalInteractor";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * [[include:Options/Interactivity/Modes.md]]
 */
export class Modes implements IModes, IOptionLoader<IModes> {
    [name: string]: unknown;

    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container?: Container) {
        this._engine = engine;
        this._container = container;
    }

    load(data?: RecursivePartial<IModes>): void {
        if (!data) {
            return;
        }

        if (!this._container) {
            return;
        }

        const interactors = this._engine.interactors.get(this._container);

        if (!interactors) {
            return;
        }

        for (const interactor of interactors as IExternalInteractor[]) {
            if (!interactor.loadModeOptions) {
                continue;
            }

            interactor.loadModeOptions(this, data);
        }
    }
}
