import type { Container } from "../Core/Container.js";
import { Engine } from "../Core/Engine.js";
import type { ILoadParams } from "../Core/Interfaces/ILoadParams.js";
import type { PlatformAdapter } from "../Platform/PlatformAdapter.js";

class AdapterEngine extends Engine {
  constructor(private readonly _platform: PlatformAdapter) {
    super();
  }

  override async load(params: ILoadParams): Promise<Container | undefined> {
    const container = await super.load(params);

    if (!container) {
      return undefined;
    }

    const target = await this._platform.resolveTarget(params);

    await this._platform.attachCanvas(container, target);

    return container;
  }

  protected override async resolveCanvas(
    _id: string,
    params: ILoadParams,
  ): Promise<HTMLCanvasElement | OffscreenCanvas> {
    const target = await this._platform.resolveTarget(params);

    return this._platform.createCanvas(target);
  }
}

/**
 * Creates a Core engine instance using an explicit platform adapter.
 * @param platform - The platform adapter to bind to the engine lifecycle
 * @returns The created engine instance
 */
export function createEngine(platform: PlatformAdapter): Engine {
  return new AdapterEngine(platform);
}
