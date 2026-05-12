import { type CanvasPixelData, getCanvasImageData, getImageData, getTextData } from "@tsparticles/canvas-utils";
import { type IContainerPlugin, isNull, safeDocument } from "@tsparticles/engine";
import type { CanvasMaskContainer } from "./types.js";
import { addParticlesFromCanvasPixels } from "./utils.js";

/**
 * The CanvasMaskPluginInstance class handles the initialization of the canvas mask,
 * converting image, text, or canvas element data into particles
 */
export class CanvasMaskPluginInstance implements IContainerPlugin {
  /** The canvas mask container */
  private readonly _container;

  /**
   * @param container - the container using the canvas mask
   */
  constructor(container: CanvasMaskContainer) {
    this._container = container;
  }

  /**
   * Initializes the canvas mask, loading pixel data from the configured source
   */
  async init(): Promise<void> {
    const container = this._container,
      options = container.actualOptions.canvasMask;

    if (!options?.enable) {
      return;
    }

    let pixelData: CanvasPixelData = {
      pixels: [],
      height: 0,
      width: 0,
    };

    const offset = options.pixels.offset;

    if (options.image) {
      const url = options.image.src;

      if (!url) {
        return;
      }

      pixelData = await getImageData(url, offset, container.canvas.render.settings);
    } else if (options.text) {
      const textOptions = options.text,
        data = getTextData(textOptions, offset, textOptions.fill, container.canvas.render.settings);

      if (isNull(data)) {
        return;
      }

      pixelData = data;
    } else if (options.element ?? options.selector) {
      const canvas =
        options.element ?? (options.selector && safeDocument().querySelector<HTMLCanvasElement>(options.selector));

      if (!canvas) {
        return;
      }

      const context = canvas.getContext("2d", container.canvas.render.settings);

      if (!context) {
        return;
      }

      pixelData = getCanvasImageData(context, canvas, offset);
    }

    addParticlesFromCanvasPixels(
      container,
      pixelData,
      options.position,
      options.scale,
      options.override,
      options.pixels.filter,
    );
  }
}
