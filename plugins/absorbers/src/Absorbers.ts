import type {
    Container,
    IContainerPlugin,
    ICoordinates,
    IOptions,
    Particle,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";
import { AbsorberInstance } from "./AbsorberInstance";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { itemFromArray } from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { AbsorberContainer } from "./AbsorberContainer";

/**
 * @category Absorbers Plugin
 */
export class Absorbers implements IContainerPlugin {
    array: AbsorberInstance[];
    absorbers: SingleOrMultiple<Absorber>;
    interactivityAbsorbers: SingleOrMultiple<Absorber>;

    constructor(private readonly container: Container) {
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];

        const overridableContainer = container as unknown as AbsorberContainer;

        overridableContainer.getAbsorber = (idxOrName?: number | string) =>
            idxOrName === undefined || typeof idxOrName === "number"
                ? this.array[idxOrName || 0]
                : this.array.find((t) => t.name === idxOrName);

        overridableContainer.addAbsorber = (options: IAbsorber, position?: ICoordinates) =>
            this.addAbsorber(options, position);
    }

    init(options?: RecursivePartial<IOptions & IAbsorberOptions>): void {
        if (!options) {
            return;
        }

        if (options.absorbers) {
            if (options.absorbers instanceof Array) {
                this.absorbers = options.absorbers.map((s) => {
                    const tmp = new Absorber();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.absorbers instanceof Array) {
                    this.absorbers = new Absorber();
                }

                this.absorbers.load(options.absorbers);
            }
        }

        const interactivityAbsorbers = options.interactivity?.modes?.absorbers;

        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                this.interactivityAbsorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new Absorber();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.interactivityAbsorbers instanceof Array) {
                    this.interactivityAbsorbers = new Absorber();
                }

                this.interactivityAbsorbers.load(interactivityAbsorbers);
            }
        }

        if (this.absorbers instanceof Array) {
            for (const absorberOptions of this.absorbers) {
                this.addAbsorber(absorberOptions);
            }
        } else {
            this.addAbsorber(this.absorbers);
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

    draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            context.save();
            absorber.draw(context);
            context.restore();
        }
    }

    stop(): void {
        this.array = [];
    }

    resize(): void {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }

    handleClickMode(mode: string): void {
        const container = this.container;
        const absorberOptions = this.absorbers;
        const modeAbsorbers = this.interactivityAbsorbers;

        if (mode === AbsorberClickMode.absorber) {
            let absorbersModeOptions: IAbsorber | undefined;

            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = itemFromArray(modeAbsorbers);
                }
            } else {
                absorbersModeOptions = modeAbsorbers;
            }

            const absorbersOptions =
                absorbersModeOptions ??
                (absorberOptions instanceof Array ? itemFromArray(absorberOptions) : absorberOptions);

            const aPosition = container.interactivity.mouse.clickPosition;

            this.addAbsorber(absorbersOptions, aPosition);
        }
    }

    addAbsorber(options: IAbsorber, position?: ICoordinates): AbsorberInstance {
        const absorber = new AbsorberInstance(this, this.container, options, position);

        this.array.push(absorber);

        return absorber;
    }

    removeAbsorber(absorber: AbsorberInstance): void {
        const index = this.array.indexOf(absorber);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
