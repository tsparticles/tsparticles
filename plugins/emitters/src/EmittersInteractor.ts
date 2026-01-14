import type { EmitterModeOptions, IEmitterDataModeOptions, IEmitterModeOptions } from "./types.js";
import {
    type Engine,
    ExternalInteractorBase,
    type ICoordinates,
    type IDelta,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    type SingleOrMultiple,
    arrayRandomIndex,
    executeOnSingleOrMultiple,
    isArray,
    isInArray,
    isNumber,
    itemFromArray,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import { defaultRandomOptions } from "./constants.js";

const emittersMode = "emitters",
    defaultIndex = 0;

export class EmittersInteractor extends ExternalInteractorBase<EmitterContainer> {
    array: EmitterInstance[];
    handleClickMode: (mode: string) => void;
    private readonly _engine;

    constructor(engine: Engine, container: EmitterContainer) {
        super(container);

        this._engine = engine;
        this.array = [];

        container.getInteractivityEmitter = (idxOrName?: number | string): EmitterInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addInteractivityEmitter = async (
            options: RecursivePartial<IEmitter>,
            position?: ICoordinates,
        ): Promise<EmitterInstance> => this.addEmitter(options, position);

        container.removeInteractivityEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                this.removeEmitter(emitter);
            }
        };

        container.playInteractivityEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                emitter.externalPlay();
            }
        };

        container.pauseInteractivityEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                emitter.externalPause();
            }
        };

        this.handleClickMode = (mode): void => {
            const container = this.container,
                options = container.actualOptions,
                modeEmitters = options.interactivity.modes.emitters;

            if (!modeEmitters || mode !== emittersMode) {
                return;
            }

            let emittersModeOptions: SingleOrMultiple<IEmitter> | undefined;

            if (isArray(modeEmitters.value)) {
                const minLength = 0,
                    modeEmittersCount = modeEmitters.value.length;

                if (modeEmittersCount > minLength && modeEmitters.random.enable) {
                    emittersModeOptions = [];

                    const usedIndexes = new Set<number>();

                    for (let i = 0; i < modeEmitters.random.count; i++) {
                        const idx = arrayRandomIndex(modeEmitters.value);

                        if (usedIndexes.has(idx) && usedIndexes.size < modeEmittersCount) {
                            i--;
                            continue;
                        }

                        usedIndexes.add(idx);

                        const selectedOptions = itemFromArray(modeEmitters.value, idx);

                        if (!selectedOptions) {
                            continue;
                        }

                        emittersModeOptions.push(selectedOptions);
                    }
                } else {
                    emittersModeOptions = modeEmitters.value;
                }
            } else {
                emittersModeOptions = modeEmitters.value;
            }

            const emittersOptions = emittersModeOptions,
                ePosition = container.interactionManager.interactivityData.mouse.clickPosition;

            void executeOnSingleOrMultiple(emittersOptions, async emitter => {
                await this.addEmitter(emitter, ePosition);
            });
        };
    }

    async addEmitter(options: RecursivePartial<IEmitter>, position?: ICoordinates): Promise<EmitterInstance> {
        const { EmitterInstance } = await import("./EmitterInstance.js"),
            emitter = new EmitterInstance(
                this._engine,
                this.container,
                (emitter: EmitterInstance) => {
                    this.removeEmitter(emitter);
                },
                options,
                position,
            );

        this.array.push(emitter);

        return emitter;
    }

    clear(): void {
        // no-op
    }

    init(): void {
        // no-op
    }

    interact(delta: IDelta): void {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactionManager.interactivityData.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        if (!mouse.clickPosition || !events.onClick.enable) {
            return false;
        }

        return isInArray(emittersMode, events.onClick.mode);
    }

    loadModeOptions(
        options: Modes & EmitterModeOptions,
        ...sources: RecursivePartial<(IModes & IEmitterModeOptions) | undefined>[]
    ): void {
        options.emitters = {
            random: defaultRandomOptions,
            value: [],
        };

        for (const source of sources) {
            if (!source?.emitters) {
                continue;
            }

            if (isArray(source.emitters)) {
                for (const emitter of source.emitters) {
                    const tmp = new Emitter();

                    tmp.load(emitter);

                    options.emitters.value.push(tmp);
                }
            } else if (Object.hasOwn(source.emitters, "value")) {
                const emitterModeOptions = source.emitters as RecursivePartial<IEmitterDataModeOptions>;

                options.emitters.random.enable = emitterModeOptions.random?.enable ?? options.emitters.random.enable;
                options.emitters.random.count = emitterModeOptions.random?.count ?? options.emitters.random.count;

                if (isArray(emitterModeOptions.value)) {
                    for (const emitter of emitterModeOptions.value) {
                        const tmp = new Emitter();

                        tmp.load(emitter);

                        options.emitters.value.push(tmp);
                    }
                } else {
                    const tmp = new Emitter();

                    tmp.load(emitterModeOptions.value);

                    options.emitters.value.push(tmp);
                }
            } else {
                const tmp = new Emitter();

                tmp.load(source.emitters as RecursivePartial<IEmitter>);

                options.emitters.value.push(tmp);
            }
        }
    }

    removeEmitter(emitter: EmitterInstance): void {
        const index = this.array.indexOf(emitter),
            minIndex = 0,
            deleteCount = 1;

        if (index >= minIndex) {
            this.array.splice(index, deleteCount);
        }
    }

    reset(): void {
        // no-op
    }
}
