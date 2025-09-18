import { type IOptionLoader, type IRgba, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmittersCanvasShapeOptions } from "../Interfaces/IEmittersCanvasShapeOptions.js";
import { PixelsOptions } from "./PixelsOptions.js";
import { TextOptions } from "./TextOptions.js";

const minAlpha = 0;

export class EmittersCanvasShapeOptions
    implements IEmittersCanvasShapeOptions, IOptionLoader<IEmittersCanvasShapeOptions>
{
    element?: HTMLCanvasElement;
    filter: string | ((pixel: IRgba) => boolean);
    image?: HTMLImageElement;
    pixels: PixelsOptions;
    scale: number;
    selector: string;
    text: TextOptions;

    constructor() {
        this.filter = (pixel): boolean => pixel.a > minAlpha;
        this.pixels = new PixelsOptions();
        this.scale = 1;
        this.selector = "";
        this.text = new TextOptions();
    }

    load(data?: RecursivePartial<IEmittersCanvasShapeOptions>): void {
        if (isNull(data)) {
            return;
        }

        if (data.element !== undefined) {
            this.element = data.element as HTMLCanvasElement;
        }

        if (data.filter !== undefined) {
            this.filter = data.filter;
        }

        this.pixels.load(data.pixels);

        if (data.scale !== undefined) {
            this.scale = data.scale;
        }

        if (data.selector !== undefined) {
            this.selector = data.selector;
        }

        if (data.image !== undefined) {
            this.image = data.image as HTMLImageElement;
        }

        this.text.load(data.text);
    }
}
