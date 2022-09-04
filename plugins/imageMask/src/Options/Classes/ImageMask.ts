import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IImageMask } from "../Interfaces/IImageMask";
import { ImageMaskOverride } from "./ImageMaskOverride";
import { ImageMaskPixels } from "./ImageMaskPixels";

/**
 * [[include:Options/Plugins/ImageMask.md]]
 * @category Image Mask Plugin
 */
export class ImageMask implements IImageMask, IOptionLoader<IImageMask> {
    enable;
    override;
    pixels;
    scale;
    src?: string;

    constructor() {
        this.pixels = new ImageMaskPixels();
        this.override = new ImageMaskOverride();
        this.scale = 1;
        this.enable = false;
    }

    load(data?: RecursivePartial<IImageMask>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.pixels.load(data.pixels);
        this.override.load(data.override);

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.src) {
            this.src = data.src;
        }
    }
}
