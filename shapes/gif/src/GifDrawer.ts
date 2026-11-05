import { type Container, type IShapeDrawData, type IShapeDrawer, getLogger } from "@tsparticles/engine";
import { decodeGIF, drawGif, getGIFLoopAmount } from "./GifUtils/Utils.js";
import type { GIF } from "./GifUtils/Types/GIF.js";
import type { GifParticle } from "./types.js";
import type { IGifShape } from "./IGifShape.js";

const gifShape = "gif",
  gifsShape = "gifs";

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

    if (!data.particle.gifData) {
      return;
    }

    context.globalAlpha = opacity;
    drawGif(data, this.#container.canvas.render.settings);
    context.globalAlpha = 1;
  }

  loadShape(particle: GifParticle): void {
    const shapeData = particle.shapeData as IGifShape | undefined;

    if (!shapeData?.src) {
      return;
    }

    const src = shapeData.src;

    if (this.#gifCache.has(src) || this.#loadingGifs.has(src)) {
      return;
    }

    this.#loadingGifs.add(src);
    this.#failedGifs.delete(src);

    void decodeGIF(src, { colorSpace: "srgb" })
      .then(gifData => {
        this.#gifCache.set(src, gifData);
        this.#resumeWaitingParticles(src, gifData);
      })
      .catch((error: unknown) => {
        this.#failedGifs.add(src);

        getLogger().error(`Error decoding GIF "${src}"`, error);
      })
      .finally(() => {
        this.#loadingGifs.delete(src);
      });
  }

  /**
   * Clears the decoded data and the compositing state, so a recycled particle starts from a clean
   * surface and cannot render the animation of a previous source
   * @param particle - The particle to process
   */
  particleDestroy(particle: GifParticle): void {
    delete particle.gifCanvas;
    delete particle.gifCanvasContext;
    delete particle.gifCanvasFrame;
    delete particle.gifPreviousCanvas;
    delete particle.gifData;
    delete particle.gifFrame;
    delete particle.gifLoopCount;
    delete particle.gifTime;
  }

  particleInit(container: Container, particle: GifParticle): void {
    const shapeData = particle.shapeData as IGifShape | undefined;

    if (!shapeData?.src) {
      return;
    }

    const gifData = this.#gifCache.get(shapeData.src);

    if (!gifData) {
      if (this.#failedGifs.has(shapeData.src) || container.destroyed || particle.destroyed) {
        return;
      }

      setTimeout((): void => {
        if (container.destroyed || particle.destroyed) {
          return;
        }

        this.particleInit(container, particle);
      });

      return;
    }

    this.#applyGifData(particle, shapeData, gifData);
  }

  #applyGifData(particle: GifParticle, shapeData: IGifShape, gifData: GIF): void {
    particle.gifData = gifData;
    particle.gifFrame = 0;
    particle.gifTime = 0;

    delete particle.gifCanvasFrame;
    delete particle.gifPreviousCanvas;
    particle.gifLoopCount = getGIFLoopAmount(gifData);

    if (particle.gifLoopCount === 0) {
      particle.gifLoopCount = Number.POSITIVE_INFINITY;
    }

    if (shapeData.loopCount !== undefined) {
      particle.gifLoopCount = shapeData.loopCount;
    }
  }

  /**
   * Gives the decoded data to the particles that stopped waiting after a failed decode, since a later
   * particle retried the source successfully. Live particles are read from the container instead of
   * being tracked here, so particles removed or recycled in the meantime are never resumed.
   * @param src - the source that has just been decoded
   * @param gifData - the decoded GIF data
   */
  #resumeWaitingParticles(src: string, gifData: GIF): void {
    const container = this.#container;

    if (container.destroyed) {
      return;
    }

    const waitingParticles = container.particles.filter(particle => {
      const shape = particle.shape;

      return (
        !(particle as GifParticle).gifData &&
        /* image particles can share the same src, but they must not receive the GIF playback state */
        (shape === gifShape || shape === gifsShape) &&
        (particle.shapeData as IGifShape | undefined)?.src === src
      );
    });

    for (const particle of waitingParticles) {
      const waitingParticle = particle as GifParticle,
        shapeData = waitingParticle.shapeData as IGifShape | undefined;

      if (!shapeData || waitingParticle.destroyed) {
        continue;
      }

      this.#applyGifData(waitingParticle, shapeData, gifData);
    }
  }
}
