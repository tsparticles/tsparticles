import { type Container, type IShapeDrawData, type IShapeDrawer, getLogger } from "@tsparticles/engine";
import { decodeGIF, drawGif, getGIFLoopAmount } from "./GifUtils/Utils.js";
import type { GIF } from "./GifUtils/Types/GIF.js";
import type { GifParticle } from "./types.js";
import type { IGifShape } from "./IGifShape.js";

export class GifDrawer implements IShapeDrawer<GifParticle> {
  readonly #container: Container;
  readonly #failedGifs: Set<string>;
  readonly #gifCache: Map<string, GIF>;
  readonly #loadingGifs: Set<string>;

  constructor(container: Container) {
    this.#container = container;
    this.#gifCache = new Map();
    this.#failedGifs = new Set();
    this.#loadingGifs = new Set();
  }

  destroy(): void {
    this.#gifCache.clear();
    this.#failedGifs.clear();
    this.#loadingGifs.clear();
  }

  draw(data: IShapeDrawData<GifParticle>): void {
    const { context, opacity } = data;

    if (!data.particle.gifData) return;

    context.globalAlpha = opacity;
    drawGif(data, this.#container.canvas.render.settings);
    context.globalAlpha = 1;
  }

  loadShape(particle: GifParticle): void {
    const shapeData = particle.shapeData as IGifShape | undefined;

    if (!shapeData?.src) return;

    const src = shapeData.src;

    if (this.#gifCache.has(src) || this.#failedGifs.has(src) || this.#loadingGifs.has(src)) return;

    this.#loadingGifs.add(src);

    void decodeGIF(src, { colorSpace: "srgb" })
      .then(gifData => {
        this.#gifCache.set(src, gifData);
      })
      .catch((error: unknown) => {
        this.#failedGifs.add(src);

        getLogger().error(`Error decoding GIF "${src}"`, error);
      })
      .finally(() => {
        this.#loadingGifs.delete(src);
      });
  }

  particleInit(container: Container, particle: GifParticle): void {
    const shapeData = particle.shapeData as IGifShape | undefined;

    if (!shapeData?.src) return;

    const gifData = this.#gifCache.get(shapeData.src);

    if (!gifData) {
      if (this.#failedGifs.has(shapeData.src) || container.destroyed || particle.destroyed) {
        return;
      }

      setTimeout((): void => {
        this.particleInit(container, particle);
      });

      return;
    }

    particle.gifData = gifData;
    particle.gifFrame = 0;
    particle.gifTime = 0;
    particle.gifLoopCount = getGIFLoopAmount(gifData);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (particle.gifLoopCount === 0) {
      particle.gifLoopCount = Number.POSITIVE_INFINITY;
    }

    if (shapeData.loopCount !== undefined) {
      particle.gifLoopCount = shapeData.loopCount;
    }
  }
}
