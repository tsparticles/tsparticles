import type { ICanvasMaskOverride } from "./ICanvasMaskOverride.js";
import type { ICanvasMaskPixels } from "./ICanvasMaskPixels.js";
import type { ICoordinates } from "@tsparticles/engine";
import type { IImageMask } from "./IImageMask.js";
import type { ITextMask } from "./ITextMask.js";

/**
 */
export interface ICanvasMask {
    element?: HTMLCanvasElement;
    enable: boolean;
    image?: IImageMask;
    override: ICanvasMaskOverride;
    pixels: ICanvasMaskPixels;
    position: ICoordinates;
    scale: number;
    selector?: string;
    text?: ITextMask;
}
