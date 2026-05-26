import {
  type IContainerPlugin,
  type PluginManager,
  getStyleFromRgb,
  rangeColorToRgb,
  safeDocument,
} from "@tsparticles/engine";
import type { BackgroundMaskContainer } from "./types.js";

export class BackgroundMaskPluginInstance implements IContainerPlugin {
  readonly #container;
  #coverColorStyle?: string;
  #coverImage?: { image: HTMLImageElement; opacity: number };
  #defaultCompositeValue?: GlobalCompositeOperation;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container: BackgroundMaskContainer) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  canvasClear(): boolean {
    const backgroundMask = this.#container.actualOptions.backgroundMask;

    if (!backgroundMask?.enable) {
      return false;
    }

    return this.canvasPaint();
  }

  canvasPaint(): boolean {
    if (!this.#container.actualOptions.backgroundMask?.enable) {
      return false;
    }

    const canvas = this.#container.canvas;

    canvas.render.canvasClear();

    if (this.#coverImage) {
      canvas.render.paintImage(this.#coverImage.image, this.#coverImage.opacity);
    } else {
      canvas.render.paintBase(this.#coverColorStyle);
    }

    return true;
  }

  drawSettingsCleanup(context: OffscreenCanvasRenderingContext2D): void {
    if (!this.#defaultCompositeValue) {
      return;
    }

    context.globalCompositeOperation = this.#defaultCompositeValue;
  }

  drawSettingsSetup(context: OffscreenCanvasRenderingContext2D): void {
    const previousComposite = context.globalCompositeOperation,
      backgroundMask = this.#container.actualOptions.backgroundMask;

    this.#defaultCompositeValue = previousComposite;

    context.globalCompositeOperation = backgroundMask?.enable ? backgroundMask.composite : previousComposite;
  }

  async init(): Promise<void> {
    await this.#initCover();
  }

  readonly #initCover = async (): Promise<void> => {
    const options = this.#container.actualOptions,
      cover = options.backgroundMask?.cover,
      color = cover?.color;

    if (color) {
      const coverRgb = rangeColorToRgb(this.#pluginManager, color);

      if (coverRgb) {
        const coverColor = {
          ...coverRgb,
          a: cover.opacity,
        };

        this.#coverColorStyle = getStyleFromRgb(coverColor, this.#container.hdr, coverColor.a);
      }
    } else {
      await new Promise<void>((resolve, reject) => {
        if (!cover?.image) {
          return;
        }

        const img = safeDocument().createElement("img");

        img.addEventListener("load", () => {
          this.#coverImage = {
            image: img,
            opacity: cover.opacity,
          };

          resolve();
        });

        img.addEventListener("error", () => {
          reject(new Error("Error loading image"));
        });

        img.src = cover.image;
      });
    }
  };
}
