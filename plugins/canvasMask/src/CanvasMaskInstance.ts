import type { Container, Engine, IContainerPlugin, RecursivePartial } from "tsparticles-engine";
import { addParticlesFromCanvasPixels, getImageData } from "./utils";
import { CanvasMask } from "./Options/Classes/CanvasMask";
import type { CanvasMaskOptions } from "./types";

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

        options.load(data?.image);

        if (!options.enable) {
            return;
        }

        const url = options.src;

        if (!url) {
            return;
        }

        const image = await getImageData(url, options.pixels.offset);

        addParticlesFromCanvasPixels(container, image, options.scale, options.override, options.pixels.filter);
    }
}
