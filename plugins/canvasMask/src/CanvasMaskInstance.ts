import type { Container, Engine, IContainerPlugin, RecursivePartial } from "tsparticles-engine";
import { addParticlesFromCanvasPixels, getCanvasImageData, getImageData, getTextData } from "./utils";
import { CanvasMask } from "./Options/Classes/CanvasMask";
import type { CanvasMaskOptions } from "./types";
import type { CanvasPixelData } from "./utils";

export class CanvasMaskInstance implements IContainerPlugin {
    readonly options;

    private readonly _container;
    private readonly _engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this.options = new CanvasMask();
    }

    async initAsync(data?: RecursivePartial<CanvasMaskOptions>): Promise<void> {
        const options = this.options,
            container = this._container;

        options.load(data?.canvasMask);

        if (!options.enable) {
            return;
        }

        let pixelData: CanvasPixelData = {
            pixels: [],
            height: 0,
            width: 0,
        };

        const offset = options.pixels.offset;

        if (options.image) {
            const url = options.image.src;

            if (!url) {
                return;
            }

            pixelData = await getImageData(url, offset);
        } else if (options.text) {
            pixelData = getTextData(options.text.text, offset);
        } else if (options.selector) {
            const canvas = document.querySelector<HTMLCanvasElement>(options.selector);

            if (!canvas) {
                return;
            }

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            pixelData = getCanvasImageData(context, canvas, offset);
        }

        console.log(pixelData);

        addParticlesFromCanvasPixels(container, pixelData, options.scale, options.override, options.pixels.filter);
    }
}
