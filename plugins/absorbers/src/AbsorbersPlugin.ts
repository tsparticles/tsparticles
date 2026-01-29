import type { AbsorberOptions, IAbsorberOptions } from "./types.js";
import {
  type Container,
  type IContainerPlugin,
  type IOptions,
  type IPlugin,
  type RecursivePartial,
  executeOnSingleOrMultiple,
  isArray,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";

/**
 */
export class AbsorbersPlugin implements IPlugin {
  readonly id = "absorbers";

  private readonly _instancesManager;

  constructor(instancesManager: AbsorbersInstancesManager) {
    this._instancesManager = instancesManager;
  }

  async getPlugin(container: AbsorberContainer): Promise<IContainerPlugin> {
    const { AbsorbersPluginInstance } = await import("./AbsorbersPluginInstance.js");

    return new AbsorbersPluginInstance(container, this._instancesManager);
  }

  loadOptions(_container: Container, options: AbsorberOptions, source?: RecursivePartial<IAbsorberOptions>): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    if (source?.absorbers) {
      options.absorbers = executeOnSingleOrMultiple(source.absorbers, absorber => {
        const tmp = new Absorber();

        tmp.load(absorber);

        return tmp;
      });
    }
  }

  needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean {
    if (!options) {
      return false;
    }

    const absorbers = options.absorbers;

    if (isArray(absorbers)) {
      return !!absorbers.length;
    } else if (absorbers) {
      return true;
    }

    return false;
  }
}
