import type { Container, IPlugin, Engine, RecursivePartial } from "tsparticles-engine";
import { isInArray } from "tsparticles-engine";
import { Emitters } from "./Emitters";
import type { IOptions } from "tsparticles-engine/Options/Interfaces/IOptions";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
import { EmitterClickMode, EmitterShapeType } from "./Enums";
import { Options } from "tsparticles-engine/Options/Classes/Options";
import { Emitter } from "./Options/Classes/Emitter";
import type { IEmitterShape } from "./IEmitterShape";
import { EmittersMain } from "./EmittersMain";
import { ShapeManager } from "./ShapeManager";
import { CircleShape } from "./Shapes/Circle/CircleShape";
import { SquareShape } from "./Shapes/Square/SquareShape";

/**
 * @category Emitters Plugin
 */
class EmittersPlugin implements IPlugin {
    readonly id;
    #engine;

    constructor(engine: Engine) {
        this.id = "emitters";
        this.#engine = engine;
    }

    getPlugin(container: Container): Emitters {
        return new Emitters(container, this.#engine);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean {
        if (options === undefined) {
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

export async function loadEmittersPlugin(engine: EmittersMain): Promise<void> {
    const plugin = new EmittersPlugin(engine);

    await engine.addPlugin(plugin);

    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name: string, shape: IEmitterShape) => {
            ShapeManager.addShape(name, shape);
        };
    }

    engine.addEmitterShape(EmitterShapeType.circle, new CircleShape());
    engine.addEmitterShape(EmitterShapeType.square, new SquareShape());
}

export * from "./EmittersMain";
