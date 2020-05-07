import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { Absorber } from "./Absorber";
import { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import type { IAbsorber } from "../../Options/Interfaces/Absorbers/IAbsorber";
import { Utils } from "../../Utils/Utils";

export class Absorbers implements IContainerPlugin {
    public readonly container: Container;
    public array: Absorber[];

    constructor(container: Container) {
        this.container = container;
        this.array = [];
    }

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.absorbers instanceof Array) {
            for (const absorberOptions of options.absorbers) {
                const absorber = new Absorber(this, absorberOptions);

                this.addAbsorber(absorber);
            }
        } else {
            const absorberOptions = options.absorbers;
            const absorber = new Absorber(this, absorberOptions);

            this.addAbsorber(absorber);
        }
    }

    public particleUpdate(particle: Particle, delta: number): void {
        for (const absorber of this.array) {
            absorber.attract(particle, delta);

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

    public handleClickMode(mode: ClickMode | string): void {
        const container = this.container;
        const options = container.options;

        if (mode === ClickMode.absorber) {
            let absorbersModeOptions: IAbsorber | undefined;
            const modeAbsorbers = options.interactivity.modes.absorbers;

            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = Utils.itemFromArray(modeAbsorbers);
                }
            } else {
                absorbersModeOptions = modeAbsorbers;
            }

            const absorbersOptions = absorbersModeOptions ?? (options.absorbers instanceof Array ?
                Utils.itemFromArray(options.absorbers) :
                options.absorbers);
            const aPosition = container.interactivity.mouse.clickPosition;
            const absorber = new Absorber(this, absorbersOptions, aPosition);

            this.addAbsorber(absorber);
        }
    }

    public addAbsorber(absorber: Absorber): void {
        this.array.push(absorber);
    }

    public removeAbsorber(absorber: Absorber): void {
        const index = this.array.indexOf(absorber);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
