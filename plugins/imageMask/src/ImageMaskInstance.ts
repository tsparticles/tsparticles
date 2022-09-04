import type { Container, Engine, IContainerPlugin, RecursivePartial } from "tsparticles-engine";
import { addParticlesFromCanvasPixels, getImageData } from "./utils";
import { ImageMask } from "./Options/Classes/ImageMask";
import type { ImageMaskOptions } from "./types";

export class ImageMaskInstance implements IContainerPlugin {
    readonly options;

    private readonly _container;
    private readonly _engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this.options = new ImageMask();
    }

    async initAsync(data?: RecursivePartial<ImageMaskOptions>): Promise<void> {
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
