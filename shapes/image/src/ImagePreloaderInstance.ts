import type { ImageContainer, ImageEngine } from "./types.js";
import type { IContainerPlugin } from "@tsparticles/engine";

export class ImagePreloaderInstance implements IContainerPlugin {
  readonly #container;
  readonly #engine;

  constructor(engine: ImageEngine, container: ImageContainer) {
    this.#engine = engine;
    this.#container = container;
  }

  destroy(): void {
    this.#engine.images?.delete(this.#container);
  }
}
