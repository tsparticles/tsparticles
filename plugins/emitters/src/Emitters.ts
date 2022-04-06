import type {
    IContainerPlugin,
    ICoordinates,
    IDelta,
    IOptions,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import { deepExtend, itemFromArray } from "tsparticles-engine";
import { Emitter } from "./Options/Classes/Emitter";
import { EmitterClickMode } from "./Enums/EmitterClickMode";
import type { EmitterContainer } from "./EmitterContainer";
import { EmitterInstance } from "./EmitterInstance";
import type { EmittersEngine } from "./EmittersEngine";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import type { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";

/**
 * @category Emitters Plugin
 */
export class Emitters implements IContainerPlugin {
    array: EmitterInstance[];
    emitters: SingleOrMultiple<Emitter>;
    interactivityEmitters: SingleOrMultiple<Emitter>;

    readonly #engine;

    constructor(engine: EmittersEngine, private readonly container: EmitterContainer) {
        this.#engine = engine;
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = [];

        container.getEmitter = (idxOrName?: number | string) =>
            idxOrName === undefined || typeof idxOrName === "number"
                ? this.array[idxOrName || 0]
                : this.array.find((t) => t.name === idxOrName);

        container.addEmitter = (options: RecursivePartial<IEmitter>, position?: ICoordinates) =>
            this.addEmitter(options, position);

        container.removeEmitter = (idxOrName?: number | string) => {
            const emitter = container.getEmitter(idxOrName);

            if (emitter) {
                this.removeEmitter(emitter);
            }
        };

        container.playEmitter = (idxOrName?: number | string) => {
            const emitter = container.getEmitter(idxOrName);

            if (emitter) {
                emitter.externalPlay();
            }
        };

        container.pauseEmitter = (idxOrName?: number | string) => {
            const emitter = container.getEmitter(idxOrName);

            if (emitter) {
                emitter.externalPause();
            }
        };
    }

    init(options?: RecursivePartial<IOptions & IEmitterOptions>): void {
        if (!options) {
            return;
        }

        if (options.emitters) {
            if (options.emitters instanceof Array) {
                this.emitters = options.emitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.emitters instanceof Array) {
                    this.emitters = new Emitter();
                }

                this.emitters.load(options.emitters);
            }
        }

        const interactivityEmitters = options.interactivity?.modes?.emitters;

        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                this.interactivityEmitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.interactivityEmitters instanceof Array) {
                    this.interactivityEmitters = new Emitter();
                }

                this.interactivityEmitters.load(interactivityEmitters);
            }
        }

        if (this.emitters instanceof Array) {
            for (const emitterOptions of this.emitters) {
                this.addEmitter(emitterOptions);
            }
        } else {
            this.addEmitter(this.emitters);
        }
    }

    play(): void {
        for (const emitter of this.array) {
            emitter.play();
        }
    }

    pause(): void {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }

    stop(): void {
        this.array = [];
    }

    update(delta: IDelta): void {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }

    handleClickMode(mode: string): void {
        const emitterOptions = this.emitters,
            modeEmitters = this.interactivityEmitters;

        if (mode === EmitterClickMode.emitter) {
            let emitterModeOptions: IEmitter | undefined;

            if (modeEmitters instanceof Array) {
                if (modeEmitters.length > 0) {
                    emitterModeOptions = itemFromArray(modeEmitters);
                }
            } else {
                emitterModeOptions = modeEmitters;
            }

            const emittersOptions =
                    emitterModeOptions ??
                    (emitterOptions instanceof Array ? itemFromArray(emitterOptions) : emitterOptions),
                ePosition = this.container.interactivity.mouse.clickPosition;

            this.addEmitter(deepExtend({}, emittersOptions) as IEmitter, ePosition);
        }
    }

    resize(): void {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }

    addEmitter(options: RecursivePartial<IEmitter>, position?: ICoordinates): EmitterInstance {
        const emitterOptions = new Emitter();

        emitterOptions.load(options);

        const emitter = new EmitterInstance(this.#engine, this, this.container, emitterOptions, position);

        this.array.push(emitter);

        return emitter;
    }

    removeEmitter(emitter: EmitterInstance): void {
        const index = this.array.indexOf(emitter);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
