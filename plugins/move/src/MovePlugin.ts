import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";
import type { MovePluginManager } from "./Types.js";

export class MovePlugin implements IPlugin {
  id = "move";

  private readonly _pluginManager;

  constructor(pluginManager: MovePluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { MovePluginInstance } = await import("./MovePluginInstance.js");

    return new MovePluginInstance(this._pluginManager, container);
  }

  loadOptions(): void {
    // no op
  }

  needsPlugin(): boolean {
    return true;
  }
}
