import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";
import type { MovePluginManager } from "./Types.js";

export class MovePlugin implements IPlugin {
  id = "move";

  readonly #pluginManager;

  constructor(pluginManager: MovePluginManager) {
    this.#pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { MovePluginInstance } = await import("./MovePluginInstance.js");

    return new MovePluginInstance(this.#pluginManager, container);
  }

  loadOptions(): void {
    // no op
  }

  needsPlugin(): boolean {
    return true;
  }
}
