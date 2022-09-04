import type { IRgba } from "tsparticles-engine";

/**
 * @category Image Mask Plugin
 */
export interface IImageMaskPixels {
    filter: string | ((pixel: IRgba) => boolean);
    offset: number;
}
