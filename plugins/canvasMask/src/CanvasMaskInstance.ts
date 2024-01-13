import type { CanvasMaskContainer } from "./types.js";
import type { CanvasPixelData } from "./utils.js";
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

            const { getImageData } = await import("./utils.js");

            pixelData = await getImageData(url, offset);
        } else if (options.text) {
            const textOptions = options.text,
                { getTextData } = await import("./utils.js"),
                data = getTextData(textOptions, offset);

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

            const { getCanvasImageData } = await import("./utils.js");

            pixelData = getCanvasImageData(context, canvas, offset);
        }

        const { addParticlesFromCanvasPixels } = await import("./utils.js");

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
