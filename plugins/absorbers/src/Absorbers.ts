import {
    type Engine,
    type IContainerPlugin,
    type ICoordinates,
    type Particle,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    isNumber,
    itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberPluginInstance } from "./AbsorberPluginInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0;

/**
 */
export class Absorbers implements IContainerPlugin {
    absorbers: SingleOrMultiple<Absorber>;
    array: AbsorberPluginInstance[];
    interactivityAbsorbers: SingleOrMultiple<Absorber>;

    private readonly _container;
    private readonly _engine;

    constructor(container: AbsorberContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];

        container.getAbsorber = (idxOrName?: number | string): AbsorberPluginInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addAbsorber = async (
            options: RecursivePartial<IAbsorber>,
            position?: ICoordinates,
        ): Promise<AbsorberPluginInstance> => this.addAbsorber(options, position);
    }

    async addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): Promise<AbsorberPluginInstance> {
        const { AbsorberPluginInstance } = await import("./AbsorberPluginInstance.js"),
            absorber = new AbsorberPluginInstance(this._container, this._engine, options, position);

        this.array.push(absorber);

        return absorber;
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            absorber.draw(context);
        }
    }

    handleClickMode(mode: string): void {
        const modeAbsorbers = this.interactivityAbsorbers;

        if (mode === (AbsorberClickMode.absorber as string)) {
            const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers) ?? new Absorber(),
                aPosition = this._container.interactionManager.interactivityData.mouse.clickPosition;

            void this.addAbsorber(absorbersModeOptions, aPosition);
        }
    }

    async init(): Promise<void> {
        this.absorbers = this._container.actualOptions.absorbers;
        this.interactivityAbsorbers = this._container.actualOptions.interactivity.modes.absorbers;

        const promises = executeOnSingleOrMultiple(this.absorbers, async (absorber): Promise<void> => {
            await this.addAbsorber(absorber);
        });

        if (promises instanceof Array) {
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

    removeAbsorber(absorber: AbsorberPluginInstance): void {
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
