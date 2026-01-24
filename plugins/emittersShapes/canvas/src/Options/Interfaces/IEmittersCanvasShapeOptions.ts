import type { IPixelsOptions } from "./IPixelsOptions.js";
import type { IRgba } from "@tsparticles/engine";
import type { ITextOptions } from "./ITextOptions.js";

export interface IEmittersCanvasShapeOptions {
  element?: HTMLCanvasElement;
  filter: string | ((pixel: IRgba) => boolean);
  image?: HTMLImageElement;
  pixels: IPixelsOptions;
  scale: number;
  selector: string;
  text: ITextOptions;
}
