/**
 * [[include:Options/Plugins/ImageMask.md]]
 * @category Image Mask Plugin
 */
export interface IImageMask {
    enable: boolean;
    offset: number;
    overrideColor: boolean;
    scale: number;
    src?: string;
}
