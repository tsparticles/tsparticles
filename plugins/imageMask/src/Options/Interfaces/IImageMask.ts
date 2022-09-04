import type { IImageMaskOverride } from "./IImageMaskOverride";
import type { IImageMaskPixels } from "./IImageMaskPixels";

/**
 * @category Image Mask Plugin
 */
export interface IImageMask {
    enable: boolean;
    override: IImageMaskOverride;
    pixels: IImageMaskPixels;
    scale: number;
    src?: string;
}
