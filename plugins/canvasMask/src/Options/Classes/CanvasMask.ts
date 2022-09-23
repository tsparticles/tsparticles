import type { ICoordinates, IOptionLoader, RecursivePartial } from "tsparticles-engine";
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
    element?: HTMLCanvasElement;
    enable;
    image?: ImageMask;
    override;
    pixels;
    position: ICoordinates;
    scale;
    selector?: string;
    text?: TextMask;

    constructor() {
        this.enable = false;
        this.override = new CanvasMaskOverride();
        this.pixels = new CanvasMaskPixels();
        this.position = {
            x: 50,
            y: 50,
        };
        this.scale = 1;
    }

    load(data?: RecursivePartial<ICanvasMask>): void {
        if (!data) {
            return;
        }

        if (data.element !== undefined && data.element instanceof HTMLCanvasElement) {
            this.element = data.element;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.image) {
            if (!this.image) {
                this.image = new ImageMask();
            }

            this.image.load(data.image);
        }

        this.pixels.load(data.pixels);

        if (data.position) {
            this.position = {
                x: data.position.x ?? this.position.x,
                y: data.position.y ?? this.position.y,
            };
        }

        this.override.load(data.override);

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.selector !== undefined) {
            this.selector = data.selector;
        }

        if (data.text) {
            if (!this.text) {
                this.text = new TextMask();
            }

            this.text.load(data.text);
        }
    }
}
