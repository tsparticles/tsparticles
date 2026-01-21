import type { CanvasMaskOptions, ICanvasMaskOptions } from "./types.js";
import { type Container, type IContainerPlugin, type IPlugin, type RecursivePartial } from "@tsparticles/engine";
import { CanvasMask } from "./Options/Classes/CanvasMask.js";

/**
 */
export class CanvasMaskPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "canvasMask";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { CanvasMaskPluginInstance } = await import("./CanvasMaskPluginInstance.js");

        return new CanvasMaskPluginInstance(container);
    }

    loadOptions(
        _container: Container,
        options: CanvasMaskOptions,
        source?: RecursivePartial<ICanvasMaskOptions>,
    ): void {
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
