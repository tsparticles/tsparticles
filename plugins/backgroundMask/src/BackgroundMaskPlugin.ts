import type { BackgroundMaskOptions, IBackgroundMaskOptions } from "./types.js";
import type { Container, Engine, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { BackgroundMask } from "./Options/Classes/BackgroundMask.js";

/**
 */
export class BackgroundMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "background-mask";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { BackgroundMaskPluginInstance } = await import("./BackgroundMaskPluginInstance.js");

        return new BackgroundMaskPluginInstance(container, this._engine);
    }

    loadOptions(
        _container: Container,
        options: BackgroundMaskOptions,
        source?: RecursivePartial<IBackgroundMaskOptions>,
    ): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let backgroundMaskOptions = options.backgroundMask;

        if (!backgroundMaskOptions?.load) {
            options.backgroundMask = backgroundMaskOptions = new BackgroundMask();
        }

        backgroundMaskOptions.load(source?.backgroundMask);
    }

    needsPlugin(options?: RecursivePartial<IBackgroundMaskOptions>): boolean {
        return !!options?.backgroundMask?.enable;
    }
}
