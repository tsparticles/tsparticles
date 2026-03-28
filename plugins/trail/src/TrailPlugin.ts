import type { Container, IContainerPlugin, IPlugin, PluginManager, RecursivePartial } from "@tsparticles/engine";
import type { ITrailOptions, TrailOptions } from "./types.js";
import { Trail } from "./Options/Classes/Trail.js";

/**
 */
export class TrailPlugin implements IPlugin {
  readonly id = "trail";

  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { TrailPluginInstance } = await import("./TrailPluginInstance.js");

    return new TrailPluginInstance(this._pluginManager, container);
  }

  loadOptions(_containerId: symbol, options: TrailOptions, source?: RecursivePartial<ITrailOptions>): void {
    if (!this.needsPlugin()) {
      return;
    }

    let trailOptions = options.trail;

    if (!trailOptions?.load) {
      options.trail = trailOptions = new Trail();
    }

    trailOptions.load(source?.trail);
  }

  needsPlugin(): boolean {
    return true;
  }
}
