import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { CanvasMask } from "./Options/Classes/CanvasMask.js";
import { CanvasMaskInstance } from "./CanvasMaskInstance.js";
import type { CanvasMaskOptions } from "./types.js";
import type { ICanvasMaskOptions } from "./types.js";

/**
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

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCanvasMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new CanvasMaskPlugin(engine), refresh);
}
