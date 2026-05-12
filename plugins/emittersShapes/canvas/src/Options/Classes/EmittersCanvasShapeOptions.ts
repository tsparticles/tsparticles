import { type IOptionLoader, type IRgba, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmittersCanvasShapeOptions } from "../Interfaces/IEmittersCanvasShapeOptions.js";
import { PixelsOptions } from "./PixelsOptions.js";
import { TextOptions } from "./TextOptions.js";

const minAlpha = 0;

/**
 * Canvas emitter shape options
 */
export class EmittersCanvasShapeOptions
  implements IEmittersCanvasShapeOptions, IOptionLoader<IEmittersCanvasShapeOptions>
{
  /**
   * The canvas element to use as the shape source
   */
  element?: HTMLCanvasElement;
  /**
   * A filter function or string to apply to pixels
   */
  filter: string | ((pixel: IRgba) => boolean);
  /**
   * The image element to use as the shape source
   */
  image?: HTMLImageElement;
  /**
   * The pixels options
   */
  pixels: PixelsOptions;
  /**
   * The scale factor for the shape
   */
  scale: number;
  /**
   * The CSS selector for the canvas element
   */
  selector: string;
  /**
   * The text options for rendering text as the shape
   */
  text: TextOptions;

  constructor() {
    this.filter = (pixel): boolean => pixel.a > minAlpha;
    this.pixels = new PixelsOptions();
    this.scale = 1;
    this.selector = "";
    this.text = new TextOptions();
  }

  /**
   * Loads the canvas shape options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmittersCanvasShapeOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.element !== undefined) {
      this.element = data.element as HTMLCanvasElement;
    }

    if (data.filter !== undefined) {
      this.filter = data.filter;
    }

    this.pixels.load(data.pixels);

    if (data.scale !== undefined) {
      this.scale = data.scale;
    }

    if (data.selector !== undefined) {
      this.selector = data.selector;
    }

    if (data.image !== undefined) {
      this.image = data.image as HTMLImageElement;
    }

    this.text.load(data.text);
  }
}
