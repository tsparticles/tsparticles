import type {
    Container,
    Engine,
    IContainerPlugin,
    IParticlesOptions,
    IRgb,
    RecursivePartial,
} from "tsparticles-engine";
import { getImageData, range, shuffle } from "./utils";
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

    async initAsync(options?: RecursivePartial<ImageMaskOptions>): Promise<void> {
        this.options.load(options?.image);

        if (!this.options.enable) {
            return;
        }

        const url = this.options.src;

        if (!url) {
            return;
        }

        const image = await getImageData(url),
            imageHeight = image.getHeight(),
            imageWidth = image.getWidth(),
            numPixels = imageHeight * imageWidth,
            indexArray = shuffle(range(numPixels)),
            maxParticles = Math.min(numPixels, this._container.actualOptions.particles.number.value);

        let selectedPixels = 0;

        while (selectedPixels < maxParticles && indexArray.length) {
            const nextIndex = indexArray.pop() || 0,
                x = nextIndex % imageWidth,
                y = Math.floor(nextIndex / imageWidth),
                pixel = image.get(x, y),
                magnitude = (((pixel.r + pixel.g + pixel.b) / 3 / 255) * pixel.a) / 255,
                shouldCreateParticle = magnitude > 0.22,
                pixelPos = {
                    x,
                    y,
                },
                scale = this.options.scale,
                canvasSize = this._container.canvas.size;

            if (shouldCreateParticle) {
                const pos = {
                    x: pixelPos.x * scale + canvasSize.width / 2 - (imageWidth * scale) / 2,
                    y: pixelPos.y * scale + canvasSize.height / 2 - (imageHeight * scale) / 2,
                };

                const pOptions: RecursivePartial<IParticlesOptions> = {};

                if (this.options.overrideColor) {
                    const color: IRgb = { ...pixel },
                        opacity = pixel.a;

                    pOptions.color = {
                        value: color,
                    };

                    pOptions.opacity = {
                        value: opacity,
                    };
                }

                this._container.particles.addParticle(pos, pOptions);

                selectedPixels++;
            }
        }
    }
}
