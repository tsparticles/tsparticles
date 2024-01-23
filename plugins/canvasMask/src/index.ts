import type { CanvasMaskOptions, ICanvasMaskOptions } from "./types.js";
import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { CanvasMask } from "./Options/Classes/CanvasMask.js";
import type { CanvasMaskInstance } from "./CanvasMaskInstance.js";

/**
 */
class CanvasMaskPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "canvasMask";
    }

    async getPlugin(container: Container): Promise<CanvasMaskInstance> {
        const { CanvasMaskInstance } = await import("./CanvasMaskInstance.js");

        return new CanvasMaskInstance(container);
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
    await engine.addPlugin(new CanvasMaskPlugin(), refresh);
}
