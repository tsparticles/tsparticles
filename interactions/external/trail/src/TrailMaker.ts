import {
    ExternalInteractorBase,
    type ICoordinates,
    type IDelta,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    isInArray,
} from "@tsparticles/engine";
import type { ITrailMode, TrailContainer, TrailMode } from "./Types.js";
import { Trail } from "./Options/Classes/Trail.js";

const trailMode = "trail";

/**
 */
export class TrailMaker extends ExternalInteractorBase<TrailContainer> {
    private _delay: number;
    private _lastPosition?: ICoordinates;

    constructor(container: TrailContainer) {
        super(container);

        this._delay = 0;
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(delta: IDelta): Promise<void> {
        const container = this.container,
            { interactivity } = container;

        if (!container.retina.reduceFactor) {
            return;
        }

        const options = container.actualOptions,
            trailOptions = options.interactivity.modes.trail;

        if (!trailOptions) {
            return;
        }

        const optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;

        if (this._delay < optDelay) {
            this._delay += delta.value;
        }

        if (this._delay < optDelay) {
            return;
        }

        const canEmit = !(
            trailOptions.pauseOnStop &&
            (interactivity.mouse.position === this._lastPosition ||
                (interactivity.mouse.position?.x === this._lastPosition?.x &&
                    interactivity.mouse.position?.y === this._lastPosition?.y))
        );

        const mousePos = container.interactivity.mouse.position;

        if (mousePos) {
            this._lastPosition = { ...mousePos };
        } else {
            delete this._lastPosition;
        }

        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }

        this._delay -= optDelay;
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        return (
            (mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode))
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
