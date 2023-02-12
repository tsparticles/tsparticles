import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import type { ISoundsOptions, SoundsOptions } from "./types";
import { Sounds } from "./Options/Classes/Sounds";
import { SoundsInstance } from "./SoundsInstance";

/**
 * @category Sounds Plugin
 */
class SoundsPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "sounds";

        this._engine = engine;
    }

    getPlugin(container: Container): SoundsInstance {
        return new SoundsInstance(container, this._engine);
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

export async function loadSoundsPlugin(engine: Engine): Promise<void> {
    const plugin = new SoundsPlugin(engine);

    await engine.addPlugin(plugin);
}
