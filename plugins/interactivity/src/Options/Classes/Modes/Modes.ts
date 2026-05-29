import { type Container, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor.js";
import type { IModes } from "../../Interfaces/Modes/IModes.js";
import type { InteractivityPluginManager } from "../../../types.js";

/**
 * [[include:Options/Interactivity/Modes.md]]
 */
export class Modes implements IModes, IOptionLoader<IModes> {
  [name: string]: unknown;

  readonly #container;
  readonly #pluginManager;

  constructor(pluginManager: InteractivityPluginManager, container?: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  load(data?: RecursivePartial<IModes>): void {
    if (isNull(data)) {
      return;
    }

    if (!this.#container) {
      return;
    }

    const interactors = this.#pluginManager.interactors?.get(this.#container) as IExternalInteractor[] | undefined;

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
