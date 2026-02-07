import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
  defaultAlpha,
  defaultRatio,
  double,
} from "@tsparticles/engine";
import { type IImage, type IParticleImage, type ImageParticle, shapeTypes } from "./Utils.js";
import type { ImageContainer, ImageEngine } from "./types.js";
import type { IImageShape } from "./IImageShape.js";
import { drawGif } from "./GifUtils/Utils.js";

const sides = 12,
  startingFrame = 0,
  defaultLoopCount = 0,
  loopDecrement = 1,
  lastFrameOffset = 1,
  svgExtension = ".svg";

/**
 * Particles Image Drawer
 */
export class ImageDrawer implements IShapeDrawer<ImageParticle> {
  private readonly _engine: ImageEngine;

  /**
   * Image drawer constructor, initializing the image set collection
   * @param engine -
   */
  constructor(engine: ImageEngine) {
    this._engine = engine;
  }

  /**
   * The draw image method
   * @param data - the shape draw data
   */
  draw(data: IShapeDrawData<ImageParticle>): void {
    const { context, radius, particle, opacity } = data,
      image = particle.image,
      element = image?.element;

    if (!image) {
      return;
    }

    context.globalAlpha = opacity;

    if (image.gif && image.gifData) {
      drawGif(data, particle.container.canvas.settings);
    } else if (element) {
      const ratio = image.ratio,
        pos = {
          x: -radius,
          y: -radius,
        },
        diameter = radius * double;

      context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
    }

    context.globalAlpha = defaultAlpha;
  }

  getDescriptor(particle: ImageParticle): string {
    const shapeData = particle.shapeData as IImageShape | undefined,
      image = particle.image,
      source = image?.source ?? shapeData?.src ?? image?.data.source ?? "image",
      name = shapeData?.name ?? image?.data.name ?? "image",
      isGif = image?.gif ?? shapeData?.gif ?? false,
      imageType = image?.data.type,
      imageSrc = image?.source ?? shapeData?.src,
      isSvg = imageType === "svg" || imageSrc?.toLowerCase().endsWith(svgExtension);

    let ratio = image?.ratio;

    ratio ??= shapeData?.width && shapeData.height ? shapeData.width / shapeData.height : defaultRatio;

    const tint = shapeData?.tint ?? image?.tint,
      tintColor = tint ? (particle.getFillColor() ?? particle.getStrokeColor()) : undefined;

    let tintKey = "none";

    if (tintColor) {
      tintKey = `${Math.round(tintColor.h)}:${Math.round(tintColor.s)}:${Math.round(tintColor.l)}`;
    }

    let frame = "static";

    if (isGif && image?.gifData) {
      // Update GIF frame based on time (before caching)
      this._updateGifFrame(particle, image);
      frame = (particle.gifFrame ?? startingFrame).toString();
    }

    const tintLabel = tint ? "tint" : "raw",
      imageLabel = isGif ? "gif" : "img";

    let tintModeLabel = "none";
    if (tint) {
      tintModeLabel = isSvg ? "source-in" : "color";
    }

    const tintSuffix = tint ? `:c:${tintKey}` : "";

    return `image:${name}:${source}:${tintLabel}:${tintModeLabel}:${ratio}:${imageLabel}:${frame}${tintSuffix}`;
  }

  getMetadata(particle: ImageParticle): ITextureMetadata {
    const shapeData = particle.shapeData as IImageShape | undefined,
      isGif = particle.image?.gif ?? shapeData?.gif ?? false,
      tint = shapeData?.tint ?? particle.image?.tint,
      imageType = particle.image?.data.type,
      source = particle.image?.source ?? shapeData?.src,
      isSvg = imageType === "svg" || source?.toLowerCase().endsWith(svgExtension);

    let tintMode: "source-in" | "color" | undefined;

    if (tint) {
      tintMode = isSvg ? "source-in" : "color";
    }

    return {
      cachePolicy: isGif || tint ? CachePolicy.Particle : CachePolicy.Static,
      colorMode: tint ? TextureColorMode.Single : TextureColorMode.Multi,
      tintMode: tintMode,
    };
  }

  /**
   * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
   * When using non-transparent images this can be an issue with shadows
   * @returns the number of sides of the image shape
   */
  getSidesCount(): number {
    return sides;
  }

  async init(container: ImageContainer): Promise<void> {
    const options = container.actualOptions;

    if (!options.preload || !this._engine.loadImage) {
      return;
    }

    const promises: Promise<void>[] = [];

    for (const imageData of options.preload) {
      promises.push(this._engine.loadImage(container, imageData));
    }

    await Promise.all(promises);
  }

  loadShape(particle: ImageParticle): void {
    if (!particle.shape || !shapeTypes.includes(particle.shape)) {
      return;
    }

    const imageData = particle.shapeData as IImageShape | undefined;

    if (!imageData) {
      return;
    }

    const images = this._engine.images?.get(particle.container) ?? [],
      image = images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

    if (image) {
      return;
    }

    void this._loadImageShape(particle.container, imageData).then(() => {
      this.loadShape(particle);
    });
  }

  /**
   * Loads the image shape to the given particle
   * @param container - the particles container
   * @param particle - the particle loading the image shape
   */
  particleInit(container: Container, particle: ImageParticle): void {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }

    const images = this._engine.images?.get(particle.container) ?? [],
      imageData = particle.shapeData as IImageShape | undefined;

    if (!imageData) {
      return;
    }

    const color = particle.getFillColor(),
      image = images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

    if (!image) {
      return;
    }

    const tint = imageData.tint || image.tint;

    if (image.loading) {
      setTimeout((): void => {
        this.particleInit(container, particle);
      });

      return;
    }

    const imageRes: IParticleImage = {
      color,
      data: image,
      element: image.element,
      gif: image.gif,
      gifData: image.gifData,
      gifLoopCount: image.gifLoopCount,
      loaded: true,
      ratio: imageData.width && imageData.height ? imageData.width / imageData.height : (image.ratio ?? defaultRatio),
      tint: tint ?? false,
      source: imageData.src,
    };

    if (!imageRes.ratio) {
      imageRes.ratio = 1;
    }

    const fill = imageData.fill ?? particle.shapeFill,
      close = imageData.close ?? particle.shapeClose,
      imageShape = {
        image: imageRes,
        fill,
        close,
      };

    particle.image = imageShape.image;
    particle.shapeFill = imageShape.fill;
    particle.shapeClose = imageShape.close;
  }

  /**
   * Loads the image shape
   * @param container - the particles container
   * @param imageShape - the image shape to load
   * @internal
   */
  private readonly _loadImageShape = async (container: ImageContainer, imageShape: IImageShape): Promise<void> => {
    if (!this._engine.loadImage) {
      throw new Error(`Image shape not initialized`);
    }

    await this._engine.loadImage(container, {
      gif: imageShape.gif,
      name: imageShape.name,
      tint: imageShape.tint,
      src: imageShape.src,
    });
  };

  /**
   * Updates GIF animation frame based on elapsed time
   * @param particle - the particle with GIF image
   * @param image - the particle image data
   * @internal
   */
  private readonly _updateGifFrame = (particle: ImageParticle, image: IParticleImage): void => {
    if (!image.gifData || !image.gif) {
      return;
    }

    const now = Date.now();

    // Initialize timing on first call
    if (particle.gifTime === undefined) {
      particle.gifTime = defaultLoopCount;
      particle.gifFrame = startingFrame;
      particle.gifLoopCount = image.gifLoopCount ?? defaultLoopCount;
      particle.gifLastUpdate = now;
      return;
    }

    // Calculate delta since last update
    const lastUpdate = particle.gifLastUpdate ?? now,
      delta = now - lastUpdate;

    particle.gifLastUpdate = now;
    particle.gifTime += delta;

    let frameIndex = particle.gifFrame ?? startingFrame;
    const frame = image.gifData.frames[frameIndex];

    if (!frame) {
      return;
    }

    // Advance frame if enough time has passed
    while (particle.gifTime > frame.delayTime) {
      particle.gifTime -= frame.delayTime;

      if (++frameIndex >= image.gifData.frames.length) {
        const loopCount = particle.gifLoopCount ?? defaultLoopCount;

        if (loopCount > defaultLoopCount) {
          particle.gifLoopCount = loopCount - loopDecrement;
          frameIndex = startingFrame;
        } else {
          // Stop at last frame if no more loops
          frameIndex = image.gifData.frames.length - lastFrameOffset;
          break;
        }
      }

      const nextFrame = image.gifData.frames[frameIndex];

      if (!nextFrame) {
        break;
      }
    }

    particle.gifFrame = frameIndex;
  };
}
