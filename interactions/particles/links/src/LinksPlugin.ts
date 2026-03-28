import { type IPlugin, type PluginManager } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import type { LinkInstance } from "./LinkInstance.js";

export class LinksPlugin implements IPlugin {
  readonly id = "links";
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: LinkContainer): Promise<LinkInstance> {
    const { LinkInstance } = await import("./LinkInstance.js");

    return new LinkInstance(container, this._pluginManager);
  }

  loadOptions(): void {
    // do nothing
  }

  needsPlugin(): boolean {
    return true;
  }
}
