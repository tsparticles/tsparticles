import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { RepulserInstance } from "./RepulserInstance";
import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import type { IRepulser } from "./Options/Interfaces/IRepulser";
import { Utils } from "../../Utils";
import { Repulser } from "./Options/Classes/Repulser";
import type { SingleOrMultiple, RecursivePartial } from "../../Types";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { RepulserClickMode } from "./Enums";
import type { IRepulserOptions } from "./Options/Interfaces/IRepulserOptions";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { RepulserContainer } from "./RepulserContainer";

/**
 * @category Repulsers Plugin
 */
export class Repulsers implements IContainerPlugin {
    array: RepulserInstance[];
    repulsers: SingleOrMultiple<Repulser>;
    interactivityRepulsers: SingleOrMultiple<Repulser>;

    constructor(private readonly container: Container) {
        this.array = [];
        this.repulsers = [];
        this.interactivityRepulsers = [];

        const overridableContainer = (container as unknown) as RepulserContainer;

        overridableContainer.addRepulser = (options: IRepulser, position?: ICoordinates) =>
            this.addRepulser(options, position);
    }

    init(options?: RecursivePartial<IOptions & IRepulserOptions>): void {
        if (!options) {
            return;
        }

        if (options.repulsers) {
            if (options.repulsers instanceof Array) {
                this.repulsers = options.repulsers.map((s) => {
                    const tmp = new Repulser();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.repulsers instanceof Array) {
                    this.repulsers = new Repulser();
                }

                this.repulsers.load(options.repulsers);
            }
        }

        const interactivityRepulsers = options.interactivity?.modes?.repulsers;

        if (interactivityRepulsers) {
            if (interactivityRepulsers instanceof Array) {
                this.interactivityRepulsers = interactivityRepulsers.map((s) => {
                    const tmp = new Repulser();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.interactivityRepulsers instanceof Array) {
                    this.interactivityRepulsers = new Repulser();
                }

                this.interactivityRepulsers.load(interactivityRepulsers);
            }
        }

        if (this.repulsers instanceof Array) {
            for (const repulserOptions of this.repulsers) {
                this.addRepulser(repulserOptions);
            }
        } else {
            this.addRepulser(this.repulsers);
        }
    }

    particleUpdate(particle: Particle): void {
        for (const repulser of this.array) {
            repulser.repulse(particle);

            if (particle.destroyed) {
                break;
            }
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        for (const repulser of this.array) {
            context.save();
            repulser.draw(context);
            context.restore();
        }
    }

    stop(): void {
        this.array = [];
    }

    resize(): void {
        for (const repulser of this.array) {
            repulser.resize();
        }
    }

    handleClickMode(mode: string): void {
        const container = this.container;
        const repulserOptions = this.repulsers;
        const modeRepulsers = this.interactivityRepulsers;

        if (mode === RepulserClickMode.repulser) {
            let repulsersModeOptions: IRepulser | undefined;

            if (modeRepulsers instanceof Array) {
                if (modeRepulsers.length > 0) {
                    repulsersModeOptions = Utils.itemFromArray(modeRepulsers);
                }
            } else {
                repulsersModeOptions = modeRepulsers;
            }

            const repulsersOptions =
                repulsersModeOptions ??
                (repulserOptions instanceof Array ? Utils.itemFromArray(repulserOptions) : repulserOptions);

            const aPosition = container.interactivity.mouse.clickPosition;

            this.addRepulser(repulsersOptions, aPosition);
        }
    }

    addRepulser(options: IRepulser, position?: ICoordinates): RepulserInstance {
        const repulser = new RepulserInstance(this, this.container, options, position);

        this.array.push(repulser);

        return repulser;
    }

    removeRepulser(repulser: RepulserInstance): void {
        const index = this.array.indexOf(repulser);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
