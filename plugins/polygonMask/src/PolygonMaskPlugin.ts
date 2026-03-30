import type { Container, IContainerPlugin, IPlugin, PluginManager, RecursivePartial } from "@tsparticles/engine";
import type { IPolygonMaskOptions, PolygonMaskOptions } from "./types.js";
import { PolygonMask } from "./Options/Classes/PolygonMask.js";
import { PolygonMaskType } from "./Enums/PolygonMaskType.js";

/**
 */
export class PolygonMaskPlugin implements IPlugin {
  readonly id = "polygon-mask";

  private readonly _pluginManager;

  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { PolygonMaskInstance } = await import("./PolygonMaskInstance.js");

    return new PolygonMaskInstance(this._pluginManager, container);
  }

  loadOptions(
    _container: Container,
    options: PolygonMaskOptions,
    source?: RecursivePartial<IPolygonMaskOptions>,
  ): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    let polygonOptions = options.polygon;

    if (polygonOptions?.load === undefined) {
      options.polygon = polygonOptions = new PolygonMask(this._pluginManager);
    }

    polygonOptions.load(source?.polygon);
  }

  needsPlugin(options?: RecursivePartial<IPolygonMaskOptions>): boolean {
    return (
      options?.polygon?.enable ??
      (options?.polygon?.type !== undefined && options.polygon.type !== PolygonMaskType.none)
    );
  }
}
