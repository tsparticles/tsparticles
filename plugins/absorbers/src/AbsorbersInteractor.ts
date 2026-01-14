import type { AbsorberModeOptions, IAbsorberModeOptions } from "./types.js";
import {
    type Engine,
    ExternalInteractorBase,
    type ICoordinates,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    isArray,
    isInArray,
    isNumber,
    itemFromArray,
} from "@tsparticles/engine";
import { Absorber } from "./Options/Classes/Absorber.js";
import type { AbsorberContainer } from "./AbsorberContainer.js";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

const absorbersMode = "absorbers",
    defaultIndex = 0;

export class AbsorbersInteractor extends ExternalInteractorBase<AbsorberContainer> {
    array: AbsorberInstance[];
    handleClickMode: (mode: string) => void;

    private readonly _engine;

    constructor(engine: Engine, container: AbsorberContainer) {
        super(container);

        this._engine = engine;
        this.array = [];

        container.getInteractivityAbsorber ??= (idxOrName?: number | string): AbsorberInstance | undefined =>
            idxOrName === undefined || isNumber(idxOrName)
                ? this.array[idxOrName ?? defaultIndex]
                : this.array.find(t => t.name === idxOrName);

        container.addInteractivityAbsorber ??= async (
            options: RecursivePartial<IAbsorber>,
            position?: ICoordinates,
        ): Promise<AbsorberInstance> => this.addAbsorber(options, position);

        this.handleClickMode = (mode): void => {
            const container = this.container,
                options = container.actualOptions,
                absorbers = options.interactivity.modes.absorbers;

            if (!absorbers || mode !== absorbersMode) {
                return;
            }

            const absorbersModeOptions = itemFromArray(absorbers) ?? new Absorber(),
                aPosition = container.interactionManager.interactivityData.mouse.clickPosition;

            void this.addAbsorber(absorbersModeOptions, aPosition);
        };
    }

    async addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): Promise<AbsorberInstance> {
        const { AbsorberInstance } = await import("./AbsorberInstance.js"),
            absorber = new AbsorberInstance(this._engine, this.container, options, position);

        this.array.push(absorber);

        return absorber;
    }

    clear(): void {
        // no-op
    }

    init(): void {
        // no-op
    }

    interact(): void {
        // no-op
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactionManager.interactivityData.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(absorbersMode, hoverMode) || isInArray(absorbersMode, clickMode);
    }

    loadModeOptions(
        options: Modes & AbsorberModeOptions,
        ...sources: RecursivePartial<(IModes & IAbsorberModeOptions) | undefined>[]
    ): void {
        options.absorbers ??= [];

        for (const source of sources) {
            if (!source) {
                continue;
            }

            if (isArray(source.absorbers)) {
                for (const absorber of source.absorbers) {
                    const tmp = new Absorber();

                    tmp.load(absorber);

                    options.absorbers.push(tmp);
                }
            } else {
                const tmp = new Absorber();

                tmp.load(source.absorbers);

                options.absorbers.push(tmp);
            }
        }
    }

    reset(): void {
        // no-op
    }
}
