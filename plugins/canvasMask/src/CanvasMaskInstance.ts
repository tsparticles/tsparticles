import type { Engine, IContainerPlugin } from "tsparticles-engine";
import { addParticlesFromCanvasPixels, getCanvasImageData, getImageData, getTextData } from "./utils";
import type { CanvasMaskContainer } from "./types";
import type { CanvasPixelData } from "./utils";

export class CanvasMaskInstance implements IContainerPlugin {
    private readonly _container;
    private readonly _engine;

    constructor(container: CanvasMaskContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async init(): Promise<void> {
        const container = this._container,
            options = container.actualOptions.canvasMask;

        if (!options?.enable) {
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
            const textOptions = options.text;

            const data = getTextData(textOptions, offset);

            if (!data) {
                return;
            }

            pixelData = data;
        } else if (options.element || options.selector) {
            const canvas =
                options.element || (options.selector && document.querySelector<HTMLCanvasElement>(options.selector));

            if (!canvas) {
                return;
            }

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            pixelData = getCanvasImageData(context, canvas, offset);
        }

        addParticlesFromCanvasPixels(
            container,
            pixelData,
            options.position,
            options.scale,
            options.override,
            options.pixels.filter
        );
    }
}
