import { type Container, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor.js";
import type { IModes } from "../../Interfaces/Modes/IModes.js";
import type { InteractivityPluginManager } from "../../../types.js";

/**
 * [[include:Options/Interactivity/Modes.md]]
 */
export class Modes implements IModes, IOptionLoader<IModes> {
  [name: string]: unknown;

  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: InteractivityPluginManager, container?: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
  }

  load(data?: RecursivePartial<IModes>): void {
    if (isNull(data)) {
      return;
    }

    if (!this._container) {
      return;
    }

    const interactors = this._pluginManager.interactors?.get(this._container) as IExternalInteractor[] | undefined;

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
