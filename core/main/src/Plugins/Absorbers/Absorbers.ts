import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { AbsorberInstance } from "./AbsorberInstance";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import { Utils } from "../../Utils";
import { Absorber } from "./Options/Classes/Absorber";
import type { SingleOrMultiple, RecursivePartial } from "../../Types";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { AbsorberClickMode } from "./Enums";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { AbsorberContainer } from "./AbsorberContainer";

/**
 * @category Absorbers Plugin
 */
export class Absorbers implements IContainerPlugin {
    public array: AbsorberInstance[];
    public absorbers: SingleOrMultiple<Absorber>;
    public interactivityAbsorbers: SingleOrMultiple<Absorber>;

    constructor(private readonly container: Container) {
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];

        const overridableContainer = (container as unknown) as AbsorberContainer;

        overridableContainer.addAbsorber = (options: IAbsorber, position?: ICoordinates) =>
            this.addAbsorber(options, position);
    }

    public init(options?: RecursivePartial<IOptions & IAbsorberOptions>): void {
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

    public particleUpdate(particle: Particle): void {
        for (const absorber of this.array) {
            absorber.attract(particle);

            if (particle.destroyed) {
                break;
            }
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        for (const absorber of this.array) {
            context.save();
            absorber.draw(context);
            context.restore();
        }
    }

    public stop(): void {
        this.array = [];
    }

    public resize(): void {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }

    public handleClickMode(mode: string): void {
        const container = this.container;
        const absorberOptions = this.absorbers;
        const modeAbsorbers = this.interactivityAbsorbers;

        if (mode === AbsorberClickMode.absorber) {
            let absorbersModeOptions: IAbsorber | undefined;

            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = Utils.itemFromArray(modeAbsorbers);
                }
            } else {
                absorbersModeOptions = modeAbsorbers;
            }

            const absorbersOptions =
                absorbersModeOptions ??
                (absorberOptions instanceof Array ? Utils.itemFromArray(absorberOptions) : absorberOptions);

            const aPosition = container.interactivity.mouse.clickPosition;

            this.addAbsorber(absorbersOptions, aPosition);
        }
    }

    public addAbsorber(options: IAbsorber, position?: ICoordinates): AbsorberInstance {
        const absorber = new AbsorberInstance(this, this.container, options, position);

        this.array.push(absorber);

        return absorber;
    }

    public removeAbsorber(absorber: AbsorberInstance): void {
        const index = this.array.indexOf(absorber);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
