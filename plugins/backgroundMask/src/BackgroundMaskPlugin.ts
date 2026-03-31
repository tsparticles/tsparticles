import type { BackgroundMaskOptions, IBackgroundMaskOptions } from "./types.js";
import type { Container, IContainerPlugin, IPlugin, PluginManager, RecursivePartial } from "@tsparticles/engine";
import { BackgroundMask } from "./Options/Classes/BackgroundMask.js";

/**
 */
export class BackgroundMaskPlugin implements IPlugin {
  readonly id = "background-mask";

  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { BackgroundMaskPluginInstance } = await import("./BackgroundMaskPluginInstance.js");

    return new BackgroundMaskPluginInstance(this._pluginManager, container);
  }

  loadOptions(
    _container: Container,
    options: BackgroundMaskOptions,
    source?: RecursivePartial<IBackgroundMaskOptions>,
  ): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    let backgroundMaskOptions = options.backgroundMask;

    if (!backgroundMaskOptions?.load) {
      options.backgroundMask = backgroundMaskOptions = new BackgroundMask();
    }

    backgroundMaskOptions.load(source?.backgroundMask);
  }

  needsPlugin(options?: RecursivePartial<IBackgroundMaskOptions>): boolean {
    return !!options?.backgroundMask?.enable;
  }
}
