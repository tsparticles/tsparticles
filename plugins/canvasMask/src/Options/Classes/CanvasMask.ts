import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { CanvasMaskOverride } from "./CanvasMaskOverride";
import { CanvasMaskPixels } from "./CanvasMaskPixels";
import type { ICanvasMask } from "../Interfaces/ICanvasMask";
import { ImageMask } from "./ImageMask";
import { TextMask } from "./TextMask";

/**
 * [[include:Options/Plugins/CanvasMask.md]]
 * @category Canvas Mask Plugin
 */
export class CanvasMask implements ICanvasMask, IOptionLoader<ICanvasMask> {
    enable;
    image?: ImageMask;
    override;
    pixels;
    scale;
    selector?: string;
    text?: TextMask;

    constructor() {
        this.pixels = new CanvasMaskPixels();
        this.override = new CanvasMaskOverride();
        this.scale = 1;
        this.enable = false;
    }

    load(data?: RecursivePartial<ICanvasMask>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.image !== undefined) {
            if (!this.image) {
                this.image = new ImageMask();
            }

            this.image.load(data.image);
        }

        this.pixels.load(data.pixels);
        this.override.load(data.override);

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.selector !== undefined) {
            this.selector = data.selector;
        }

        if (data.text !== undefined) {
            if (!this.text) {
                this.text = new TextMask();
            }

            this.text.load(data.text);
        }
    }
}
