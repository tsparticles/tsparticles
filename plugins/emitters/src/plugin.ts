import type { IPlugin } from "tsparticles-engine/Core/Interfaces/IPlugin";
import type { Container } from "tsparticles-engine/Core/Container";
import { isInArray } from "tsparticles-engine/Utils";
import { Emitters } from "./Emitters";
import type { RecursivePartial } from "tsparticles-engine/Types";
import type { IOptions } from "tsparticles-engine/Options/Interfaces/IOptions";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
import { EmitterClickMode } from "./Enums";
import { Options } from "tsparticles-engine/Options/Classes/Options";
import { Emitter } from "./Options/Classes/Emitter";
import { Main } from "tsparticles-engine";

/**
 * @category Emitters Plugin
 */
class Plugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "emitters";
    }

    getPlugin(container: Container): Emitters {
        return new Emitters(container);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean {
        if (options === undefined) {
            return false;
        }

        const emitters = options.emitters;
        let loadEmitters = false;

        if (emitters instanceof Array) {
            if (emitters.length) {
                loadEmitters = true;
            }
        } else if (emitters !== undefined) {
            loadEmitters = true;
        } else if (
            options.interactivity?.events?.onClick?.mode &&
            isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode)
        ) {
            loadEmitters = true;
        }

        return loadEmitters;
    }

    loadOptions(options: Options, source?: RecursivePartial<IOptions & IEmitterOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as IEmitterOptions;

        if (source?.emitters) {
            if (source?.emitters instanceof Array) {
                optionsCast.emitters = source?.emitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let emitterOptions = optionsCast.emitters as Emitter;

                if (emitterOptions?.load === undefined) {
                    optionsCast.emitters = emitterOptions = new Emitter();
                }

                emitterOptions.load(source?.emitters);
            }
        }

        const interactivityEmitters = source?.interactivity?.modes?.emitters;

        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let emitterOptions = optionsCast.interactivity.modes.emitters as Emitter;

                if (emitterOptions?.load === undefined) {
                    optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter();
                }

                emitterOptions.load(interactivityEmitters);
            }
        }
    }
}

export function loadEmittersPlugin(tsParticles: Main) {
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
}

export type { IEmitterOptions };
export * from "./Enums";
