import type { AttractContainer, AttractMode, IAttractMode } from "./Types.js";
import {
    Circle,
    type Engine,
    ExternalInteractorBase,
    type ICoordinates,
    type IModes,
    type Modes,
    type Particle,
    type Range,
    type RecursivePartial,
    Vector,
    clamp,
    getDistances,
    getEasing,
    isInArray,
    millisecondsToSeconds,
    mouseMoveEvent,
} from "@tsparticles/engine";
import { Attract } from "./Options/Classes/Attract.js";

const attractMode = "attract",
    minRadius = 0,
    minFactor = 1,
    identity = 1;

/**
 * Particle external attract manager
 */
export class Attractor extends ExternalInteractorBase<AttractContainer> {
    handleClickMode: (mode: string) => void;

    private readonly _engine;

    constructor(engine: Engine, container: AttractContainer) {
        super(container);

        this._engine = engine;

        if (!container.attract) {
            container.attract = { particles: [] };
        }

        this.handleClickMode = (mode): void => {
            const options = this.container.actualOptions,
                attract = options.interactivity.modes.attract;

            if (!attract || mode !== attractMode) {
                return;
            }

            if (!container.attract) {
                container.attract = { particles: [] };
            }

            container.attract.clicking = true;
            container.attract.count = 0;

            for (const particle of container.attract.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }

                particle.velocity.setTo(particle.initialVelocity);
            }

            container.attract.particles = [];
            container.attract.finish = false;

            setTimeout(() => {
                if (container.destroyed) {
                    return;
                }

                if (!container.attract) {
                    container.attract = { particles: [] };
                }

                container.attract.clicking = false;
            }, attract.duration * millisecondsToSeconds);
        };
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            attract = container.actualOptions.interactivity.modes.attract;

        if (!attract) {
            return;
        }

        container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
            events = options.interactivity.events,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            clickEnabled = events.onClick.enable,
            clickMode = events.onClick.mode;

        if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
            this._hoverAttract();
        } else if (clickEnabled && isInArray(attractMode, clickMode)) {
            this._clickAttract();
        }

        await Promise.resolve();
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events;

        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
    }

    loadModeOptions(
        options: Modes & AttractMode,
        ...sources: RecursivePartial<(IModes & IAttractMode) | undefined>[]
    ): void {
        if (!options.attract) {
            options.attract = new Attract();
        }

        for (const source of sources) {
            options.attract.load(source?.attract);
        }
    }

    reset(): void {
        // do nothing
    }

    private readonly _clickAttract: () => void = () => {
        const container = this.container;

        if (!container.attract) {
            container.attract = { particles: [] };
        }

        const { attract } = container;

        if (!attract.finish) {
            if (!attract.count) {
                attract.count = 0;
            }

            attract.count++;

            if (attract.count === container.particles.count) {
                attract.finish = true;
            }
        }

        if (attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition,
                attractRadius = container.retina.attractModeDistance;

            if (!attractRadius || attractRadius < minRadius || !mousePos) {
                return;
            }

            this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
        } else if (attract.clicking === false) {
            attract.particles = [];
        }
    };

    private readonly _hoverAttract: () => void = () => {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            attractRadius = container.retina.attractModeDistance;

        if (!attractRadius || attractRadius < minRadius || !mousePos) {
            return;
        }

        this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    };

    private readonly _processAttract: (position: ICoordinates, attractRadius: number, area: Range) => void = (
        position,
        attractRadius,
        area,
    ) => {
        const container = this.container,
            attractOptions = container.actualOptions.interactivity.modes.attract;

        if (!attractOptions) {
            return;
        }

        const query = container.particles.quadTree.query(area, (p) => this.isEnabled(p));

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position),
                velocity = attractOptions.speed * attractOptions.factor,
                attractFactor = clamp(
                    getEasing(attractOptions.easing)(identity - distance / attractRadius) * velocity,
                    minFactor,
                    attractOptions.maxSpeed,
                ),
                normVec = Vector.create(
                    !distance ? velocity : (dx / distance) * attractFactor,
                    !distance ? velocity : (dy / distance) * attractFactor,
                );

            particle.position.subFrom(normVec);
        }
    };
}
