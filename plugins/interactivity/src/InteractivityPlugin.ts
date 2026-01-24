import {
  type Container,
  type IContainerPlugin,
  type IPlugin,
  type RecursivePartial,
  deepExtend,
} from "@tsparticles/engine";
import type {
  IInteractivityOptions,
  IInteractivityParticlesOptions,
  InteractivityEngine,
  InteractivityOptions,
  InteractivityParticlesOptions,
} from "./types.js";
import type { IInteractivity } from "./Options/Interfaces/IInteractivity.js";
import { Interactivity } from "./Options/Classes/Interactivity.js";

/**
 */
export class InteractivityPlugin implements IPlugin {
  readonly _engine;
  readonly id;

  constructor(engine: InteractivityEngine) {
    this._engine = engine;
    this.id = "interactivity";
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { InteractivityPluginInstance } = await import("./InteractivityPluginInstance.js");

    return new InteractivityPluginInstance(this._engine, container);
  }

  loadOptions(
    container: Container,
    options: InteractivityOptions,
    source?: RecursivePartial<IInteractivityOptions>,
  ): void {
    if (!this.needsPlugin()) {
      return;
    }

    let interactivityOptions = options.interactivity;

    if (!interactivityOptions?.load) {
      options.interactivity = interactivityOptions = new Interactivity(this._engine, container);
    }

    interactivityOptions.load(source?.interactivity);

    const interactors = this._engine.interactors?.get(container);

    if (!interactors) {
      return;
    }

    for (const interactor of interactors) {
      if (interactor.loadOptions) {
        interactor.loadOptions(options, source);
      }
    }
  }

  loadParticlesOptions(
    container: Container,
    options: InteractivityParticlesOptions,
    source?: RecursivePartial<IInteractivityParticlesOptions>,
  ): void {
    if (source?.interactivity) {
      options.interactivity = deepExtend({}, source.interactivity) as RecursivePartial<IInteractivity>;
    }

    const interactors = this._engine.interactors?.get(container);

    if (!interactors) {
      return;
    }

    for (const interactor of interactors) {
      if (interactor.loadParticlesOptions) {
        interactor.loadParticlesOptions(options, source);
      }
    }
  }

  needsPlugin(): boolean {
    return true;
  }
}
