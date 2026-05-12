import type { ICanvasMaskOverride } from "./ICanvasMaskOverride.js";
import type { ICanvasMaskPixels } from "./ICanvasMaskPixels.js";
import type { ICoordinates } from "@tsparticles/engine";
import type { IImageMask } from "./IImageMask.js";
import type { ITextMask } from "./ITextMask.js";

/** The canvas mask options */
export interface ICanvasMask {
  /** The canvas mask element */
  element?: HTMLCanvasElement;
  /** Enables the canvas mask */
  enable: boolean;
  /** The canvas mask image options */
  image?: IImageMask;
  /** The canvas mask override options */
  override: ICanvasMaskOverride;
  /** The canvas mask pixels options */
  pixels: ICanvasMaskPixels;
  /** The canvas mask position */
  position: ICoordinates;
  /** The canvas mask scale */
  scale: number;
  /** The canvas mask element selector */
  selector?: string;
  /** The canvas mask text options */
  text?: ITextMask;
}
