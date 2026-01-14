import {
    type Engine,
    type IContainerPlugin,
    type ICoordinates,
    type Particle,
    type RecursivePartial,
    executeOnSingleOrMultiple,
    isArray,
    isNumber,
} from "@tsparticles/engine";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0;

/**
 */
export class AbsorbersPluginInstance implements IContainerPlugin {
    array: AbsorberInstance[];

    private readonly _container;
    private readonly _engine;

    constructor(container: AbsorberContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this.array = [];

        container.getAbsorber ??= (idxOrName?: number | string): AbsorberInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addAbsorber ??= async (
            options: RecursivePartial<IAbsorber>,
            position?: ICoordinates,
        ): Promise<AbsorberInstance> => this.addAbsorber(options, position);
    }

    async addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): Promise<AbsorberInstance> {
        const { AbsorberInstance } = await import("./AbsorberInstance.js"),
            absorber = new AbsorberInstance(this._container, this._engine, options, position);

        this.array.push(absorber);

        return absorber;
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            absorber.draw(context);
        }
    }

    async init(): Promise<void> {
        const absorbers = this._container.actualOptions.absorbers,
            promises = executeOnSingleOrMultiple(absorbers, async (absorber): Promise<void> => {
                await this.addAbsorber(absorber);
            });

        if (isArray(promises)) {
            await Promise.all(promises);
        } else {
            await promises;
        }
    }

    particleUpdate(particle: Particle): void {
        for (const absorber of this.array) {
            absorber.attract(particle);

            if (particle.destroyed) {
                break;
            }
        }
    }

    removeAbsorber(absorber: AbsorberInstance): void {
        const index = this.array.indexOf(absorber),
            deleteCount = 1;

        if (index >= defaultIndex) {
            this.array.splice(index, deleteCount);
        }
    }

    resize(): void {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }

    stop(): void {
        this.array = [];
    }
}
