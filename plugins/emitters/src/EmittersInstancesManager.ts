import { type Engine, type ICoordinates, type RecursivePartial, isNumber } from "@tsparticles/engine";
import { Emitter } from "./Options/Classes/Emitter.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

const defaultIndex = 0;

export class EmittersInstancesManager {
    private readonly _containerArrays;
    private readonly _engine;

    constructor(engine: Engine) {
        this._containerArrays = new Map<EmitterContainer, EmitterInstance[]>();
        this._engine = engine;
    }

    async addEmitter(
        container: EmitterContainer,
        options: RecursivePartial<IEmitter>,
        position?: ICoordinates,
    ): Promise<EmitterInstance> {
        const emitterOptions = new Emitter();

        emitterOptions.load(options);

        const { EmitterInstance } = await import("./EmitterInstance.js"),
            emitter = new EmitterInstance(
                this._engine,
                container,
                (emitter: EmitterInstance) => {
                    this.removeEmitter(container, emitter);
                },
                emitterOptions,
                position,
            );

        await emitter.init();

        this.getArray(container).push(emitter);

        return emitter;
    }

    clear(container: EmitterContainer): void {
        this.initContainer(container);

        this._containerArrays.set(container, []);
    }

    getArray(container: EmitterContainer): EmitterInstance[] {
        this.initContainer(container);

        let array = this._containerArrays.get(container);

        if (!array) {
            array = [];

            this._containerArrays.set(container, array);
        }

        return array;
    }

    initContainer(container: EmitterContainer): void {
        if (this._containerArrays.has(container)) {
            return;
        }

        this._containerArrays.set(container, []);

        container.getEmitter = (idxOrName?: number | string): EmitterInstance | undefined => {
            const array = this.getArray(container);

            return idxOrName === undefined || isNumber(idxOrName)
                ? array[idxOrName ?? defaultIndex]
                : array.find(t => t.name === idxOrName);
        };

        container.addEmitter = async (
            options: RecursivePartial<IEmitter>,
            position?: ICoordinates,
        ): Promise<EmitterInstance> => this.addEmitter(container, options, position);

        container.removeEmitter = (idxOrName?: number | string): void => {
            const emitter = container.getEmitter?.(idxOrName);

            if (emitter) {
                this.removeEmitter(container, emitter);
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

    removeEmitter(container: EmitterContainer, emitter: EmitterInstance): void {
        const index = this.getArray(container).indexOf(emitter),
            minIndex = 0,
            deleteCount = 1;

        if (index >= minIndex) {
            this.getArray(container).splice(index, deleteCount);
        }
    }
}
