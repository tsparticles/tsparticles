import type { IRgba } from "tsparticles-engine";

/**
 */
export interface ICanvasMaskPixels {
    filter: string | ((pixel: IRgba) => boolean);
    offset: number;
}
