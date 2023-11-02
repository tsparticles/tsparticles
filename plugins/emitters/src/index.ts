import type { EmitterOptions, IEmitterModeOptions, IEmitterOptions } from "./types.js";
import {
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
import { Emitters } from "./Emitters.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import type { IEmitterShape } from "./IEmitterShape.js";
import { ShapeManager } from "./ShapeManager.js";

/**
 */
class EmittersPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: EmittersEngine) {
        this._engine = engine;
        this.id = "emitters";
    }

    getPlugin(container: EmitterContainer): Emitters {
        return new Emitters(this._engine, container);
    }

    loadOptions(options: EmitterOptions, source?: RecursivePartial<IEmitterOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        if (source?.emitters) {
            options.emitters = executeOnSingleOrMultiple(source.emitters, (emitter) => {
                const tmp = new Emitter();

                tmp.load(emitter);

                return tmp;
            });
        }

        const interactivityEmitters = source?.interactivity?.modes?.emitters;

        if (interactivityEmitters) {
            if (isArray(interactivityEmitters)) {
                options.interactivity.modes.emitters = {
                    random: {
                        count: 1,
                        enable: true,
                    },
                    value: interactivityEmitters.map((s) => {
                        const tmp = new Emitter();

                        tmp.load(s);

                        return tmp;
                    }),
                };
            } else {
                const emitterMode = interactivityEmitters as IEmitterModeOptions;

                if (emitterMode.value !== undefined) {
                    if (isArray(emitterMode.value)) {
                        options.interactivity.modes.emitters = {
                            random: {
                                count: emitterMode.random.count ?? 1,
                                enable: emitterMode.random.enable ?? false,
                            },
                            value: emitterMode.value.map((s) => {
                                const tmp = new Emitter();

                                tmp.load(s);

                                return tmp;
                            }),
                        };
                    } else {
                        const tmp = new Emitter();

                        tmp.load(emitterMode.value);

                        options.interactivity.modes.emitters = {
                            random: {
                                count: emitterMode.random.count ?? 1,
                                enable: emitterMode.random.enable ?? false,
                            },
                            value: tmp,
                        };
                    }
                } else {
                    const emitterOptions = (options.interactivity.modes.emitters = {
                        random: {
                            count: 1,
                            enable: false,
                        },
                        value: new Emitter(),
                    });

                    emitterOptions.value.load(interactivityEmitters as IEmitter);
                }
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

/**
 * @param engine - The [[EmittersEngine]] instance to load the plugin into
 * @param refresh -
 */
export async function loadEmittersPlugin(engine: EmittersEngine, refresh = true): Promise<void> {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new ShapeManager(engine);
    }

    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name: string, shape: IEmitterShape): void => {
            engine.emitterShapeManager?.addShape(name, shape);
        };
    }

    const plugin = new EmittersPlugin(engine);

    await engine.addPlugin(plugin, refresh);
}

export * from "./IEmitterShape.js";
export * from "./EmitterContainer.js";
export * from "./EmittersEngine.js";
export * from "./Enums/EmitterClickMode.js";
