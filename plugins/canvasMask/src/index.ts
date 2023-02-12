import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import { CanvasMask } from "./Options/Classes/CanvasMask";
import { CanvasMaskInstance } from "./CanvasMaskInstance";
import type { CanvasMaskOptions } from "./types";
import type { ICanvasMaskOptions } from "./types";

/**
 * @category Canvas Mask Plugin
 */
class CanvasMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "canvasMask";

        this._engine = engine;
    }

    getPlugin(container: Container): CanvasMaskInstance {
        return new CanvasMaskInstance(container, this._engine);
    }

    loadOptions(options: CanvasMaskOptions, source?: RecursivePartial<ICanvasMaskOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let canvasMaskOptions = options.canvasMask;

        if (canvasMaskOptions?.load === undefined) {
            options.canvasMask = canvasMaskOptions = new CanvasMask();
        }

        canvasMaskOptions.load(source?.canvasMask);
    }

    needsPlugin(options?: RecursivePartial<ICanvasMaskOptions>): boolean {
        return options?.canvasMask?.enable ?? false;
    }
}

export async function loadCanvasMaskPlugin(engine: Engine): Promise<void> {
    const plugin = new CanvasMaskPlugin(engine);

    await engine.addPlugin(plugin);
}
