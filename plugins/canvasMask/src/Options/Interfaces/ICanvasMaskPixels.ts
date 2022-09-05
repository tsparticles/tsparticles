import type { IRgba } from "tsparticles-engine";

/**
 * @category Canvas Mask Plugin
 */
export interface ICanvasMaskPixels {
    filter: string | ((pixel: IRgba) => boolean);
    offset: number;
}
