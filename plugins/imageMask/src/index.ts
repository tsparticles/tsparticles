import type { Container, Engine, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import { ImageMask } from "./Options/Classes/ImageMask";
import { ImageMaskInstance } from "./ImageMaskInstance";
import type { ImageMaskOptions } from "./types";

/**
 * @category Image Mask Plugin
 */
class ImageMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "imageMask";

        this._engine = engine;
    }

    getPlugin(container: Container): ImageMaskInstance {
        return new ImageMaskInstance(container, this._engine);
    }

    loadOptions(options: Options, source?: RecursivePartial<ImageMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as ImageMaskOptions;
        let imageOptions = optionsCast.image as ImageMask;

        if (imageOptions?.load === undefined) {
            optionsCast.image = imageOptions = new ImageMask();
        }

        imageOptions.load(source?.image);
    }

    needsPlugin(options?: RecursivePartial<ImageMaskOptions>): boolean {
        return options?.image?.enable ?? false;
    }
}

export async function loadImageMaskPlugin(engine: Engine): Promise<void> {
    const plugin = new ImageMaskPlugin(engine);

    await engine.addPlugin(plugin);
}
