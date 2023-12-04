import type { Container } from "../../../../Core/Container.js";
import type { Engine } from "../../../../Core/Engine.js";
import type { IExternalInteractor } from "../../../../Core/Interfaces/IExternalInteractor.js";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

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

        const interactors = <IExternalInteractor[]>this._engine.interactors.get(this._container);

        if (!interactors) {
            return;
        }

        for (const interactor of interactors) {
            if (!interactor.loadModeOptions) {
                continue;
            }

            interactor.loadModeOptions(this, data);
        }
    }
}
