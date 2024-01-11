import {
    type CanvasPixelData,
    addParticlesFromCanvasPixels,
    getCanvasImageData,
    getImageData,
    getTextData,
} from "./utils.js";
import type { CanvasMaskContainer } from "./types.js";
import type { IContainerPlugin } from "@tsparticles/engine";

export class CanvasMaskInstance implements IContainerPlugin {
    private readonly _container;

    constructor(container: CanvasMaskContainer) {
        this._container = container;
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
        } else if (options.element ?? options.selector) {
            const canvas =
                options.element ?? (options.selector && document.querySelector<HTMLCanvasElement>(options.selector));

            if (!canvas) {
                return;
            }

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            pixelData = getCanvasImageData(context, canvas, offset);
        }

        await addParticlesFromCanvasPixels(
            container,
            pixelData,
            options.position,
            options.scale,
            options.override,
            options.pixels.filter,
        );
    }
}
