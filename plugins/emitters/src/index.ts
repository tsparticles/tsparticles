import type { EmitterOptions, IEmitterModeOptions, IEmitterOptions } from "./types";
import type { IOptions, IPlugin, RecursivePartial } from "tsparticles-engine";
import { executeOnSingleOrMultiple, isInArray } from "tsparticles-engine";
import { CircleShape } from "./Shapes/Circle/CircleShape";
import { Emitter } from "./Options/Classes/Emitter";
import { EmitterClickMode } from "./Enums/EmitterClickMode";
import type { EmitterContainer } from "./EmitterContainer";
import { EmitterShapeType } from "./Enums/EmitterShapeType";
import { Emitters } from "./Emitters";
import type { EmittersEngine } from "./EmittersEngine";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import type { IEmitterShape } from "./IEmitterShape";
import { ShapeManager } from "./ShapeManager";
import { SquareShape } from "./Shapes/Square/SquareShape";

/**
 * @category Emitters Plugin
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
            if (interactivityEmitters instanceof Array) {
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
                    if (emitterMode.value instanceof Array) {
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
            (emitters instanceof Array && !!emitters.length) ||
            emitters !== undefined ||
            (!!options.interactivity?.events?.onClick?.mode &&
                isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode))
        );
    }
}

export async function loadEmittersPlugin(engine: EmittersEngine): Promise<void> {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new ShapeManager(engine);
    }

    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name: string, shape: IEmitterShape): void => {
            engine.emitterShapeManager?.addShape(name, shape);
        };
    }

    const plugin = new EmittersPlugin(engine);

    await engine.addPlugin(plugin);

    engine.addEmitterShape(EmitterShapeType.circle, new CircleShape());
    engine.addEmitterShape(EmitterShapeType.square, new SquareShape());
}

export * from "./EmitterContainer";
export * from "./EmittersEngine";
export * from "./Enums/EmitterClickMode";
export * from "./Enums/EmitterShapeType";
