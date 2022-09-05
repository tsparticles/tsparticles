import type { ICanvasMaskOverride } from "./ICanvasMaskOverride";
import type { ICanvasMaskPixels } from "./ICanvasMaskPixels";
import type { IImageMask } from "./IImageMask";
import type { ITextMask } from "./ITextMask";

/**
 * @category Canvas Mask Plugin
 */
export interface ICanvasMask {
    enable: boolean;
    image?: IImageMask;
    override: ICanvasMaskOverride;
    pixels: ICanvasMaskPixels;
    scale: number;
    selector?: string;
    text?: ITextMask;
}
