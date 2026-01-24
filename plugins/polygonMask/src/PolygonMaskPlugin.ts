import type { Container, Engine, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPolygonMaskOptions, PolygonMaskOptions } from "./types.js";
import { PolygonMask } from "./Options/Classes/PolygonMask.js";
import { PolygonMaskType } from "./Enums/PolygonMaskType.js";

/**
 */
export class PolygonMaskPlugin implements IPlugin {
  readonly id;

  private readonly _engine;

  constructor(engine: Engine) {
    this.id = "polygonMask";

    this._engine = engine;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { PolygonMaskInstance } = await import("./PolygonMaskInstance.js");

    return new PolygonMaskInstance(container, this._engine);
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
      options.polygon = polygonOptions = new PolygonMask(this._engine);
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
