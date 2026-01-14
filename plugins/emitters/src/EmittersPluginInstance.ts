import {
    type IContainerPlugin,
    type ICoordinates,
    type IDelta,
    type RecursivePartial,
    isArray,
    isNumber,
} from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { EmittersEngine } from "./EmittersEngine.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

/**
 */
export class EmittersPluginInstance implements IContainerPlugin {
    array: EmitterInstance[];

    private readonly _engine;

    constructor(
        engine: EmittersEngine,
        private readonly container: EmitterContainer,
    ) {
        this._engine = engine;
        this.array = [];

        const defaultIndex = 0;

        container.getEmitter = (idxOrName?: number | string): EmitterInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addEmitter = async (
            options: RecursivePartial<IEmitter>,
            position?: ICoordinates,
        ): Promise<EmitterInstance> => this.addEmitter(options, position);

        container.removeEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                this.removeEmitter(emitter);
            }
        };

        container.playEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                emitter.externalPlay();
            }
        };

        container.pauseEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                emitter.externalPause();
            }
        };
    }

    async addEmitter(options: RecursivePartial<IEmitter>, position?: ICoordinates): Promise<EmitterInstance> {
        const emitterOptions = new Emitter();

        emitterOptions.load(options);

        const { EmitterInstance } = await import("./EmitterInstance.js"),
            emitter = new EmitterInstance(
                this._engine,
                this.container,
                (emitter: EmitterInstance) => {
                    this.removeEmitter(emitter);
                },
                emitterOptions,
                position,
            );

        await emitter.init();

        this.array.push(emitter);

        return emitter;
    }

    async init(): Promise<void> {
        const emittersOptions = this.container.actualOptions.emitters;

        if (isArray(emittersOptions)) {
            for (const emitterOptions of emittersOptions) {
                await this.addEmitter(emitterOptions);
            }
        } else {
            await this.addEmitter(emittersOptions);
        }
    }

    pause(): void {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }

    play(): void {
        for (const emitter of this.array) {
            emitter.play();
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

    resize(): void {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }

    stop(): void {
        this.array = [];
    }

    update(delta: IDelta): void {
        this.array.forEach(emitter => {
            emitter.update(delta);
        });
    }
}
