import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Utils } from "../../Utils";
import { Emitters } from "./Emitters";
import { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
import { EmitterClickMode } from "./Enums";
import { Options } from "../../Options/Classes/Options";
import { Emitter } from "./Options/Classes/Emitter";

class EmittersPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "emitters";
    }

    public getPlugin(container: Container): Emitters {
        return new Emitters(container);
    }

    public needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean {
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
            Utils.isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode)
        ) {
            loadEmitters = true;
        }

        return loadEmitters;
    }

    public loadOptions(options: Options, source?: RecursivePartial<IOptions & IEmitterOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IEmitterOptions;

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

const plugin = new EmittersPlugin();

export type { IEmitterOptions };
export { plugin as EmittersPlugin };
export * from "./Enums";
