import {
    type IContainerPlugin,
    type ICoordinates,
    type Particle,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    isNumber,
    itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import type { Absorber } from "./Options/Classes/Absorber.js";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const defaultIndex = 0;

/**
 */
export class Absorbers implements IContainerPlugin {
    absorbers: SingleOrMultiple<Absorber>;
    array: AbsorberInstance[];
    interactivityAbsorbers: SingleOrMultiple<Absorber>;

    constructor(private readonly container: AbsorberContainer) {
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];

        container.getAbsorber = (idxOrName?: number | string): AbsorberInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addAbsorber = async (
            options: RecursivePartial<IAbsorber>,
            position?: ICoordinates,
        ): Promise<AbsorberInstance> => this.addAbsorber(options, position);
    }

    async addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): Promise<AbsorberInstance> {
        const absorber = new AbsorberInstance(this, this.container, options, position);

        this.array.push(absorber);

        return Promise.resolve(absorber);
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            absorber.draw(context);
        }
    }

    handleClickMode(mode: string): void {
        const absorberOptions = this.absorbers,
            modeAbsorbers = this.interactivityAbsorbers;

        if (mode === (AbsorberClickMode.absorber as string)) {
            const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers),
                absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions),
                aPosition = this.container.interactivity.mouse.clickPosition;

            void this.addAbsorber(absorbersOptions, aPosition);
        }
    }

    async init(): Promise<void> {
        this.absorbers = this.container.actualOptions.absorbers;
        this.interactivityAbsorbers = this.container.actualOptions.interactivity.modes.absorbers;

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
