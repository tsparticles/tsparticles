import type { EmitterOptions, IEmitterModeOptions, IEmitterModeRandomOptions, IEmitterOptions } from "./types.js";
import {
    type IContainerPlugin,
    type IOptions,
    type IPlugin,
    type RecursivePartial,
    executeOnSingleOrMultiple,
    isArray,
    isInArray,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterClickMode } from "./Enums/EmitterClickMode.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

/**
 */
export class EmittersPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: EmittersEngine) {
        this._engine = engine;
        this.id = "emitters";
    }

    async getPlugin(container: EmitterContainer): Promise<IContainerPlugin> {
        const { Emitters } = await import("./Emitters.js");

        return new Emitters(this._engine, container);
    }

    loadOptions(options: EmitterOptions, source?: RecursivePartial<IEmitterOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        if (source?.emitters) {
            options.emitters = executeOnSingleOrMultiple(source.emitters, emitter => {
                const tmp = new Emitter();

                tmp.load(emitter);

                return tmp;
            });
        }

        const interactivityEmitters = source?.interactivity?.modes?.emitters;

        if (!interactivityEmitters) {
            return;
        }

        const defaultRandomOptions: IEmitterModeRandomOptions = {
            count: 1,
            enable: true,
        };

        if (isArray(interactivityEmitters)) {
            options.interactivity.modes.emitters = {
                random: defaultRandomOptions,
                value: interactivityEmitters.map(s => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                }),
            };
        } else {
            const emitterMode = interactivityEmitters;

            if (Object.hasOwn(emitterMode, "value")) {
                const emitterModeOptions = emitterMode as RecursivePartial<IEmitterModeOptions>;

                if (isArray(emitterModeOptions.value)) {
                    options.interactivity.modes.emitters = {
                        random: {
                            count: emitterModeOptions.random?.count ?? defaultRandomOptions.count,
                            enable: emitterModeOptions.random?.enable ?? defaultRandomOptions.enable,
                        },
                        value: emitterModeOptions.value.map(s => {
                            const tmp = new Emitter();

                            tmp.load(s);

                            return tmp;
                        }),
                    };
                } else {
                    const tmp = new Emitter();

                    tmp.load(emitterModeOptions.value);

                    options.interactivity.modes.emitters = {
                        random: {
                            count: emitterModeOptions.random?.count ?? defaultRandomOptions.count,
                            enable: emitterModeOptions.random?.enable ?? defaultRandomOptions.enable,
                        },
                        value: tmp,
                    };
                }
            } else {
                const tmp = new Emitter();

                tmp.load(emitterMode as RecursivePartial<IEmitter>);

                options.interactivity.modes.emitters = {
                    random: defaultRandomOptions,
                    value: tmp,
                };
            }
        }
    }

    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean {
        if (!options) {
            return false;
        }

        const emitters = options.emitters;

        return (
            (isArray(emitters) && !!emitters.length) ||
            emitters !== undefined ||
            (!!options.interactivity?.events?.onClick?.mode &&
                isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode))
        );
    }
}
