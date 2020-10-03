import type { IImage } from "./IImage";

/**
 * @category Interfaces
 */
export interface IParticleImage {
    source: string;
    data: IImage;
    ratio: number;
    element?: HTMLImageElement;
    loaded?: boolean;
    replaceColor: boolean;
}
