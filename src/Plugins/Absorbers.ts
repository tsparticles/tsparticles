import type { IPlugin } from "../Core/Interfaces/IPlugin";
import { Absorber } from "./Absorber";
import { Container } from "../Core/Container";
import { Particle } from "../Core/Particle";
import { ClickMode } from "../Enums/Modes/ClickMode";
import { IAbsorber } from "../Options/Interfaces/Absorbers/IAbsorber";
import { Utils } from "../Utils/Utils";

export class Absorbers implements IPlugin {
    private readonly container: Container;
    private absorbers: Absorber[];

    constructor(container: Container) {
        this.container = container;
        this.absorbers = [];
    }

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.absorbers instanceof Array) {
            for (const absorberOptions of options.absorbers) {
                const absorber = new Absorber(container, absorberOptions);

                this.absorbers.push(absorber);
            }
        } else {
            const absorberOptions = options.absorbers;
            const absorber = new Absorber(container, absorberOptions);

            this.absorbers.push(absorber);
        }
    }

    public particleUpdate(particle: Particle): void {
        for (const absorber of this.absorbers) {
            absorber.attract(particle);

            if (particle.destroyed) {
                break;
            }
        }
    }

    public draw(): void {
        for (const absorber of this.absorbers) {
            absorber.draw();
        }
    }

    public reset(): void {
        this.absorbers = [];
    }

    public resize(): void {
        for (const absorber of this.absorbers) {
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
            const bhPosition = container.interactivity.mouse.clickPosition;
            const absorber = new Absorber(container, absorbersOptions, bhPosition);

            this.absorbers.push(absorber);
        }
    }
}