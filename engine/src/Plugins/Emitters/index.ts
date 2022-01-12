import type { Container, IPlugin } from "../../Core";
import { EmitterClickMode, EmitterShapeType } from "./Enums";
import { CircleShape } from "./Shapes/Circle/CircleShape";
import { Emitter } from "./Options/Classes/Emitter";
import { Emitters } from "./Emitters";
import { EmittersMain } from "./EmittersMain";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
import { IEmitterShape } from "./IEmitterShape";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { Options } from "../../Options/Classes/Options";
import type { RecursivePartial } from "../../Types";
import { ShapeManager } from "./ShapeManager";
import { SquareShape } from "./Shapes/Square/SquareShape";
import { isInArray } from "../../Utils";

/**
 * @category Emitters Plugin
 */
class EmittersPlugin implements IPlugin {
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

export async function loadEmittersPlugin(tsParticles: EmittersMain): Promise<void> {
    const plugin = new EmittersPlugin();

    await tsParticles.addPlugin(plugin);

    if (!tsParticles.addEmitterShape) {
        tsParticles.addEmitterShape = (name: string, shape: IEmitterShape) => {
            ShapeManager.addShape(name, shape);
        };
    }

    tsParticles.addEmitterShape(EmitterShapeType.circle, new CircleShape());
    tsParticles.addEmitterShape(EmitterShapeType.square, new SquareShape());
}

export * from "./EmittersMain";
