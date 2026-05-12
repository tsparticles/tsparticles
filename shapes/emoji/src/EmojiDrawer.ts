import {
  type CanvasContextType,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type SingleOrMultiple,
  double,
  executeOnSingleOrMultiple,
  getRangeMax,
  isInArray,
  itemFromSingleOrMultiple,
  safeDocument,
} from "@tsparticles/engine";
import { drawEmoji, validTypes } from "./Utils.js";
import type { EmojiParticle } from "./EmojiParticle.js";
import type { IEmojiShape } from "./IEmojiShape.js";
import { loadFont } from "@tsparticles/canvas-utils";

const defaultFont = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
  noPadding = 0,
  firstItem = 0;

/** Emoji shape drawer plugin */
export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
  /** Cached emoji renderings mapped by value and font */
  private readonly _emojiShapeDict: Map<string, ImageBitmap | HTMLCanvasElement> = new Map<string, ImageBitmap>();

  /** Clears the emoji cache */
  destroy(): void {
    for (const [key, data] of this._emojiShapeDict) {
      if (data instanceof ImageBitmap) {
        data.close();
      }

      this._emojiShapeDict.delete(key);
    }
  }

  /**
   * Draws the emoji shape
   * @param data
   */
  draw(data: IShapeDrawData<EmojiParticle>): void {
    const key = data.particle.emojiDataKey;

    if (!key) {
      return;
    }

    const image = this._emojiShapeDict.get(key);

    if (!image) {
      return;
    }

    drawEmoji(data, image);
  }

  /**
   * Loads the required emoji fonts
   * @param container
   */
  async init(container: Container): Promise<void> {
    const options = container.actualOptions,
      shapeData = options.particles.shape;

    if (!validTypes.some(t => isInArray(t, shapeData.type))) {
      return;
    }

    const promises: Promise<void>[] = [loadFont(defaultFont)],
      shapeOptions = validTypes.map(t => shapeData.options[t])[firstItem] as SingleOrMultiple<IEmojiShape>;

    executeOnSingleOrMultiple(shapeOptions, shape => {
      if (shape.font) {
        promises.push(loadFont(shape.font));
      }
    });

    await Promise.all(promises);
  }

  /**
   * Cleans up emoji data when particle is destroyed
   * @param particle
   */
  particleDestroy(particle: EmojiParticle): void {
    particle.emojiDataKey = undefined;
  }

  /**
   * Initializes the emoji shape for a particle
   * @param container
   * @param particle
   */
  particleInit(container: Container, particle: EmojiParticle): void {
    const shapeData = particle.shapeData as unknown as IEmojiShape;

    if (!shapeData.value) {
      return;
    }

    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);

    if (!emoji) {
      return;
    }

    const emojiOptions =
        typeof emoji === "string"
          ? {
              font: shapeData.font ?? defaultFont,
              padding: shapeData.padding ?? noPadding,
              value: emoji,
            }
          : {
              font: defaultFont,
              padding: noPadding,
              ...shapeData,
              ...emoji,
            },
      font = emojiOptions.font,
      value = emojiOptions.value,
      cacheKey = `${value}_${font}`;

    if (this._emojiShapeDict.has(cacheKey)) {
      particle.emojiDataKey = cacheKey;

      return;
    }

    const padding = emojiOptions.padding * double,
      maxSize = getRangeMax(particle.size.value),
      fullSize = maxSize + padding,
      canvasSize = fullSize * double;

    let cacheCanvas: HTMLCanvasElement | OffscreenCanvas, context: CanvasContextType | null;

    if (typeof OffscreenCanvas === "undefined") {
      const canvas = safeDocument().createElement("canvas");

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      context = canvas.getContext("2d", container.canvas.render.settings);
      cacheCanvas = canvas;
    } else {
      cacheCanvas = new OffscreenCanvas(canvasSize, canvasSize);
      context = cacheCanvas.getContext("2d", container.canvas.render.settings);
    }

    if (!context) {
      return;
    }

    context.font = `400 ${(maxSize * double).toString()}px ${font}`;
    context.textBaseline = "middle";
    context.textAlign = "center";

    context.fillText(value, fullSize, fullSize);

    const image = cacheCanvas instanceof HTMLCanvasElement ? cacheCanvas : cacheCanvas.transferToImageBitmap();

    this._emojiShapeDict.set(cacheKey, image);

    particle.emojiDataKey = cacheKey;
  }
}
