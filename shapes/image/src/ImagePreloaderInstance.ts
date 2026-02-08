import type { ImageContainer, ImageEngine } from "./types.js";
import type { IContainerPlugin } from "@tsparticles/engine";

export class ImagePreloaderInstance implements IContainerPlugin {
  private readonly _container;
  private readonly _engine;

  constructor(engine: ImageEngine, container: ImageContainer) {
    this._engine = engine;
    this._container = container;
  }

  destroy(): void {
    this._engine.images?.delete(this._container);
  }
}
