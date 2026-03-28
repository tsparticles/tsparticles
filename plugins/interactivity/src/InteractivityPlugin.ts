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
  InteractivityOptions,
  InteractivityParticlesOptions,
  InteractivityPluginManager,
} from "./types.js";
import type { IInteractivity } from "./Options/Interfaces/IInteractivity.js";
import type { IParticleInteractorBase } from "./Interfaces/IParticleInteractorBase.js";
import { Interactivity } from "./Options/Classes/Interactivity.js";

/**
 */
export class InteractivityPlugin implements IPlugin {
  readonly id = "interactivity";

  private readonly _pluginManager;

  constructor(pluginManager: InteractivityPluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { InteractivityPluginInstance } = await import("./InteractivityPluginInstance.js");

    return new InteractivityPluginInstance(this._pluginManager, container);
  }

  loadOptions(
    containerId: symbol,
    options: InteractivityOptions,
    source?: RecursivePartial<IInteractivityOptions>,
  ): void {
    if (!this.needsPlugin()) {
      return;
    }

    let interactivityOptions = options.interactivity;

    if (!interactivityOptions?.load) {
      options.interactivity = interactivityOptions = new Interactivity(this._pluginManager, containerId);
    }

    interactivityOptions.load(source?.interactivity);

    const interactors = this._pluginManager.interactors?.get(containerId);

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
    containerId: symbol,
    options: InteractivityParticlesOptions,
    source?: RecursivePartial<IInteractivityParticlesOptions>,
  ): void {
    if (source?.interactivity) {
      options.interactivity = deepExtend({}, source.interactivity) as RecursivePartial<IInteractivity>;
    }

    const interactors = this._pluginManager.interactors?.get(containerId) as IParticleInteractorBase[] | undefined;

    if (!interactors) {
      return;
    }

    for (const interactor of interactors) {
      interactor.loadParticlesOptions?.(options, source);
    }
  }

  needsPlugin(): boolean {
    return true;
  }
}
