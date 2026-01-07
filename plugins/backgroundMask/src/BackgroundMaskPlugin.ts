import type { BackgroundMaskOptions, IBackgroundMaskOptions } from "./types.js";
import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import { BackgroundMask } from "./Options/Classes/BackgroundMask.js";
import { BackgroundMaskInstance } from "./BackgroundMaskInstance.js";

/**
 */
export class BackgroundMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "background-mask";

        this._engine = engine;
    }

    getPlugin(container: Container): Promise<BackgroundMaskInstance> {
        return Promise.resolve(new BackgroundMaskInstance(container, this._engine));
    }

    loadOptions(options: BackgroundMaskOptions, source?: RecursivePartial<IBackgroundMaskOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        let backgroundMaskOptions = options.backgroundMask;

        if (!backgroundMaskOptions?.load) {
            options.backgroundMask = backgroundMaskOptions = new BackgroundMask();
        }

        backgroundMaskOptions.load(source?.backgroundMask);
    }

    needsPlugin(): boolean {
        return true;
    }
}
