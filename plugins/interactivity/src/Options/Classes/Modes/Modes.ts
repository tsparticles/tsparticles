import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor.js";
import type { IModes } from "../../Interfaces/Modes/IModes.js";
import type { InteractivityEngine } from "../../../types.js";

/**
 * [[include:Options/Interactivity/Modes.md]]
 */
export class Modes implements IModes, IOptionLoader<IModes> {
  [name: string]: unknown;

  private readonly _containerId;
  private readonly _engine;

  constructor(engine: InteractivityEngine, containerId?: symbol) {
    this._engine = engine;
    this._containerId = containerId;
  }

  load(data?: RecursivePartial<IModes>): void {
    if (isNull(data)) {
      return;
    }

    if (!this._containerId) {
      return;
    }

    const interactors = this._engine.interactors?.get(this._containerId) as IExternalInteractor[] | undefined;

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
