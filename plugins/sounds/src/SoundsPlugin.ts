import {
    type Container,
    type Engine,
    type IPlugin,
    type RecursivePartial,
    mouseDownEvent,
    touchStartEvent,
} from "@tsparticles/engine";
import type { ISoundsOptions, SoundsOptions } from "./types.js";
import { Sounds } from "./Options/Classes/Sounds.js";
import { SoundsInstance } from "./SoundsInstance.js";
import { unmuteWindow } from "./utils.js";

const generalFirstClickHandler = (): void => {
    removeEventListener(mouseDownEvent, generalFirstClickHandler);
    removeEventListener(touchStartEvent, generalFirstClickHandler);

    unmuteWindow();
};

/**
 */
export class SoundsPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "sounds";

        this._engine = engine;

        const listenerOptions = {
            capture: true,
            once: true,
        };

        addEventListener(mouseDownEvent, generalFirstClickHandler, listenerOptions);
        addEventListener(touchStartEvent, generalFirstClickHandler, listenerOptions);
    }

    getPlugin(container: Container): Promise<SoundsInstance> {
        return Promise.resolve(new SoundsInstance(container, this._engine));
    }

    loadOptions(options: SoundsOptions, source?: RecursivePartial<ISoundsOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let soundsOptions = options.sounds;

        if (soundsOptions?.load === undefined) {
            options.sounds = soundsOptions = new Sounds();
        }

        soundsOptions.load(source?.sounds);
    }

    needsPlugin(options?: RecursivePartial<ISoundsOptions>): boolean {
        return options?.sounds?.enable ?? false;
    }
}
