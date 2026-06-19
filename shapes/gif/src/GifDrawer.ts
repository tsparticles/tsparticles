import type { Container, IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { decodeGIF, drawGif, getGIFLoopAmount } from "./GifUtils/Utils.js";
import type { GIF } from "./GifUtils/Types/GIF.js";
import type { GifParticle } from "./types.js";
import type { IGifShape } from "./IGifShape.js";

export class GifDrawer implements IShapeDrawer<GifParticle> {
  readonly #container: Container;
  readonly #gifCache: Map<string, GIF>;

  constructor(container: Container) {
    this.#container = container;
    this.#gifCache = new Map();
  }

  destroy(): void {
    this.#gifCache.clear();
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

    if (this.#gifCache.has(shapeData.src)) return;

    void decodeGIF(shapeData.src, { colorSpace: "srgb" }).then(gifData => {
      this.#gifCache.set(shapeData.src, gifData);
    });
  }

  particleInit(container: Container, particle: GifParticle): void {
    const shapeData = particle.shapeData as IGifShape | undefined;

    if (!shapeData?.src) return;

    const gifData = this.#gifCache.get(shapeData.src);

    if (!gifData) {
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
