import type { ICanvasMaskOverride } from "./ICanvasMaskOverride";
import type { ICanvasMaskPixels } from "./ICanvasMaskPixels";
import type { ICoordinates } from "tsparticles-engine";
import type { IImageMask } from "./IImageMask";
import type { ITextMask } from "./ITextMask";

/**
 * @category Canvas Mask Plugin
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
