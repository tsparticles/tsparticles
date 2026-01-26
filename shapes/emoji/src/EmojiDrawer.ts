import {
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
import type { EmojiParticle } from "./EmojiParticle.js";
import type { IEmojiShape } from "./IEmojiShape.js";
import { drawEmoji } from "./Utils.js";
import { loadFont } from "@tsparticles/canvas-utils";

const defaultFont = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
  noPadding = 0,
  firstItem = 0;

export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
  readonly validTypes = ["emoji"] as const;

  private readonly _emojiShapeDict: Map<string, ImageBitmap | HTMLCanvasElement> = new Map<string, ImageBitmap>();

  destroy(): void {
    for (const [key, data] of this._emojiShapeDict) {
      if (data instanceof ImageBitmap) {
        data.close();
      }

      this._emojiShapeDict.delete(key);
    }
  }

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

  async init(container: Container): Promise<void> {
    const options = container.actualOptions,
      { validTypes } = this,
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

  particleDestroy(particle: EmojiParticle): void {
    particle.emojiDataKey = undefined;
  }

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

    let cacheCanvas: HTMLCanvasElement | OffscreenCanvas,
      context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

    if (typeof OffscreenCanvas === "undefined") {
      const canvas = safeDocument().createElement("canvas");

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      context = canvas.getContext("2d", container.canvas.settings);
      cacheCanvas = canvas;
    } else {
      cacheCanvas = new OffscreenCanvas(canvasSize, canvasSize);
      context = cacheCanvas.getContext("2d", container.canvas.settings);
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
