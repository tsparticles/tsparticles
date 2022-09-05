import type { ICanvasMaskOverride } from "./ICanvasMaskOverride";
import type { ICanvasMaskPixels } from "./ICanvasMaskPixels";

/**
 * @category Canvas Mask Plugin
 */
export interface ICanvasMask {
    enable: boolean;
    override: ICanvasMaskOverride;
    pixels: ICanvasMaskPixels;
    scale: number;
    src?: string;
}
