import {
  type IContainerPlugin,
  type PluginManager,
  getLogger,
  getStyleFromRgb,
  originPoint,
  rangeColorToRgb,
  safeDocument,
} from "@tsparticles/engine";
import type { BackgroundMaskContainer } from "./types.js";

export class BackgroundMaskPluginInstance implements IContainerPlugin {
  readonly #container;
  #coverColorStyle?: string;
  #coverImage?: { image: HTMLImageElement; opacity: number };
  #defaultCompositeValue?: GlobalCompositeOperation;
  #maskElement?: HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement | null;
  readonly #maskWarnings = new Set<string>();
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
    const { backgroundMask } = this.#container.actualOptions;

    if (!backgroundMask?.enable) {
      return false;
    }

    const canvas = this.#container.canvas;

    canvas.render.canvasClear();

    const cover = backgroundMask.cover;
    let dynamicUsed = false;
    const maskElement = this.#maskElement;

    /* layer 0: auto-draw external element */
    if (maskElement) {
      dynamicUsed = true;

      canvas.render.draw(ctx => {
        try {
          ctx.drawImage(maskElement, originPoint.x, originPoint.y, canvas.size.width, canvas.size.height);
        } catch {
          this.#maskWarnOnce("mask-element-draw-error", "Error drawing background mask cover element onto canvas");
        }
      });
    }

    /* layer 1: custom draw callback */
    if (cover.draw) {
      dynamicUsed = true;

      const drawFn = cover.draw;

      canvas.render.draw(ctx => {
        try {
          drawFn(ctx, { value: 0, factor: 1 });
        } catch {
          this.#maskWarnOnce("mask-draw-error", "Error in mask cover.draw callback");
        }
      });
    }

    /* fallback: static cover (legacy behavior, unchanged) */
    if (!dynamicUsed) {
      if (this.#coverImage) {
        canvas.render.paintImage(this.#coverImage.image, this.#coverImage.opacity);
      } else {
        canvas.render.paintBase(this.#coverColorStyle);
      }
    }

    return true;
  }

  destroy(): void {
    this.#maskElement = null;
    this.#maskWarnings.clear();
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
    this.#maskWarnings.clear();

    await this.#initCover();
    this.#resolveMaskElement();
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
    } else if (cover?.image) {
      const coverImage = cover.image;

      await new Promise<void>((resolve, reject) => {
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

        img.src = coverImage;
      });
    }
  };

  readonly #maskWarnOnce = (key: string, message: string): void => {
    if (this.#maskWarnings.has(key)) {
      return;
    }

    this.#maskWarnings.add(key);
    getLogger().warning(`[tsParticles BackgroundMask] ${message}`);
  };

  readonly #resolveMaskElement = (): void => {
    const cover = this.#container.actualOptions.backgroundMask?.cover;

    this.#maskElement = null;

    if (!cover?.element) {
      return;
    }

    if (typeof cover.element === "string") {
      if (typeof document !== "undefined") {
        const node = document.querySelector(cover.element);

        if (node instanceof HTMLCanvasElement || node instanceof HTMLVideoElement || node instanceof HTMLImageElement) {
          this.#maskElement = node;
        } else if (node) {
          this.#maskWarnOnce(
            "mask-element-not-supported",
            `Mask cover element "${cover.element}" matched a non-drawable element (expected canvas, video, or img)`,
          );
        } else {
          this.#maskWarnOnce(
            "mask-element-not-found",
            `Mask cover element selector "${cover.element}" not found in the DOM`,
          );
        }
      }
    } else if (
      cover.element instanceof HTMLCanvasElement ||
      cover.element instanceof OffscreenCanvas ||
      cover.element instanceof HTMLVideoElement ||
      cover.element instanceof HTMLImageElement
    ) {
      this.#maskElement = cover.element;
    }
  };
}
