import { ClickMode, ExternalInteractorBase, HoverMode, isInArray } from "tsparticles-engine";
import type { ICoordinates, IDelta, IModes, Modes, Particle, RecursivePartial } from "tsparticles-engine";
import type { ITrailMode, TrailContainer, TrailMode } from "./Types";
import { Trail } from "./Options/Classes/Trail";

/**
 * @category Interactions
 */
export class TrailMaker extends ExternalInteractorBase {
    readonly #container;

    private delay: number;
    private lastPosition?: ICoordinates;

    constructor(container: TrailContainer) {
        super(container);

        this.#container = container;

        this.delay = 0;
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(delta: IDelta): Promise<void> {
        if (!this.container.retina.reduceFactor) {
            return;
        }

        const container = this.#container,
            options = container.actualOptions,
            trailOptions = options.interactivity.modes.trail;

        if (!trailOptions) {
            return;
        }

        const optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;

        if (this.delay < optDelay) {
            this.delay += delta.value;
        }

        if (this.delay < optDelay) {
            return;
        }

        let canEmit = true;

        if (trailOptions.pauseOnStop) {
            if (
                container.interactivity.mouse.position === this.lastPosition ||
                (container.interactivity.mouse.position?.x === this.lastPosition?.x &&
                    container.interactivity.mouse.position?.y === this.lastPosition?.y)
            ) {
                canEmit = false;
            }
        }

        if (container.interactivity.mouse.position) {
            this.lastPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        } else {
            delete this.lastPosition;
        }

        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }

        this.delay -= optDelay;
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        return (
            (mouse.clicking && mouse.inside && !!mouse.position && isInArray(ClickMode.trail, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(HoverMode.trail, events.onHover.mode))
        );
    }

    loadModeOptions(
        options: Modes & TrailMode,
        ...sources: RecursivePartial<(IModes & ITrailMode) | undefined>[]
    ): void {
        if (!options.trail) {
            options.trail = new Trail();
        }

        for (const source of sources) {
            options.trail.load(source?.trail);
        }
    }

    reset(): void {
        // nothing to do
    }
}
