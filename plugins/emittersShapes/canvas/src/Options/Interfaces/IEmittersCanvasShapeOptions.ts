import type { IPixelsOptions } from "./IPixelsOptions.js";
import type { IRgba } from "@tsparticles/engine";
import type { ITextOptions } from "./ITextOptions.js";

/** Canvas emitter shape options interface */
export interface IEmittersCanvasShapeOptions {
  /** The canvas element to use as the shape source */
  element?: HTMLCanvasElement;
  /** A filter function or string to apply to pixels; callbacks also receive the source color space. */
  filter:
    string | ((pixel: IRgba, colorSpace?: "display-p3" | "srgb") => boolean);
  /** The image element to use as the shape source */
  image?: HTMLImageElement;
  /** The pixels options */
  pixels: IPixelsOptions;
  /** The scale factor for the shape */
  scale: number;
  /** The CSS selector for the canvas element */
  selector: string;
  /** The text options */
  text: ITextOptions;
}
