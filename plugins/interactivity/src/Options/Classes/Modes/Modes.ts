import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor.js";
import type { IModes } from "../../Interfaces/Modes/IModes.js";
import type { InteractivityPluginManager } from "../../../types.js";

/**
 * [[include:Options/Interactivity/Modes.md]]
 */
export class Modes implements IModes, IOptionLoader<IModes> {
  [name: string]: unknown;

  private readonly _containerId;
  private readonly _pluginManager;

  constructor(pluginManager: InteractivityPluginManager, containerId?: symbol) {
    this._pluginManager = pluginManager;
    this._containerId = containerId;
  }

  load(data?: RecursivePartial<IModes>): void {
    if (isNull(data)) {
      return;
    }

    if (!this._containerId) {
      return;
    }

    const interactors = this._pluginManager.interactors?.get(this._containerId) as IExternalInteractor[] | undefined;

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
