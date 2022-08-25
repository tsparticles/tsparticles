import type {
    IContainerPlugin,
    ICoordinates,
    IOptions,
    Particle,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import { executeOnSingleOrMultiple, itemFromSingleOrMultiple } from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode";
import type { AbsorberContainer } from "./AbsorberContainer";
import { AbsorberInstance } from "./AbsorberInstance";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";

/**
 * @category Absorbers Plugin
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
            idxOrName === undefined || typeof idxOrName === "number"
                ? this.array[idxOrName || 0]
                : this.array.find((t) => t.name === idxOrName);

        container.addAbsorber = (options: RecursivePartial<IAbsorber>, position?: ICoordinates): AbsorberInstance =>
            this.addAbsorber(options, position);
    }

    addAbsorber(options: RecursivePartial<IAbsorber>, position?: ICoordinates): AbsorberInstance {
        const absorber = new AbsorberInstance(this, this.container, options, position);

        this.array.push(absorber);

        return absorber;
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            context.save();
            absorber.draw(context);
            context.restore();
        }
    }

    handleClickMode(mode: string): void {
        const absorberOptions = this.absorbers,
            modeAbsorbers = this.interactivityAbsorbers;

        if (mode === AbsorberClickMode.absorber) {
            const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers),
                absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions),
                aPosition = this.container.interactivity.mouse.clickPosition;

            this.addAbsorber(absorbersOptions, aPosition);
        }
    }

    init(options?: RecursivePartial<IOptions & IAbsorberOptions>): void {
        if (!options) {
            return;
        }

        this.absorbers = executeOnSingleOrMultiple(options.absorbers, (absorber) => {
            const tmp = new Absorber();

            tmp.load(absorber);

            return tmp;
        });

        this.interactivityAbsorbers = executeOnSingleOrMultiple(options.interactivity?.modes?.absorbers, (absorber) => {
            const tmp = new Absorber();

            tmp.load(absorber);

            return tmp;
        });

        executeOnSingleOrMultiple(this.absorbers, (absorber) => {
            this.addAbsorber(absorber);
        });
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
        const index = this.array.indexOf(absorber);

        if (index >= 0) {
            this.array.splice(index, 1);
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
