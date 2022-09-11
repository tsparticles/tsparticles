import type { Container } from "../../../../Core/Container";
import type { Engine } from "../../../../engine";
import type { IExternalInteractor } from "../../../../Core/Interfaces/IExternalInteractor";
import type { IModes } from "../../../Interfaces/Interactivity/Modes/IModes";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
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

        if (this._container) {
            const interactors = this._engine.plugins.interactors.get(this._container);

            if (interactors) {
                for (const interactor of interactors as IExternalInteractor[]) {
                    if (interactor.loadModeOptions) {
                        interactor.loadModeOptions(this, data);
                    }
                }
            }
        }
    }
}
