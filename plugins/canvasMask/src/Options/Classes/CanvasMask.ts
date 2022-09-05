import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ICanvasMask } from "../Interfaces/ICanvasMask";
import { CanvasMaskOverride } from "./CanvasMaskOverride";
import { CanvasMaskPixels } from "./CanvasMaskPixels";

/**
 * [[include:Options/Plugins/CanvasMask.md]]
 * @category Canvas Mask Plugin
 */
export class CanvasMask implements ICanvasMask, IOptionLoader<ICanvasMask> {
    enable;
    override;
    pixels;
    scale;
    src?: string;

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
