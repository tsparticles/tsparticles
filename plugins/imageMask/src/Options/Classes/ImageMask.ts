import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IImageMask } from "../Interfaces/IImageMask";

/**
 * [[include:Options/Plugins/ImageMask.md]]
 * @category Image Mask Plugin
 */
export class ImageMask implements IImageMask, IOptionLoader<IImageMask> {
    enable;
    overrideColor;
    scale;
    src?: string;

    constructor() {
        this.overrideColor = true;
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

        if (data.overrideColor !== undefined) {
            this.overrideColor = data.overrideColor;
        }

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.src) {
            this.src = data.src;
        }
    }
}
