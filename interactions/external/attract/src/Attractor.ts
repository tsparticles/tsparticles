import type { AttractContainer, AttractMode, IAttractMode } from "./Types";
import {
    Circle,
    ClickMode,
    type Engine,
    ExternalInteractorBase,
    HoverMode,
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
    mouseMoveEvent,
} from "tsparticles-engine";
import { Attract } from "./Options/Classes/Attract";

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

            if (!attract || mode !== ClickMode.attract) {
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
            }, attract.duration * 1000);
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
            mousedownEnabled = events.onMouseDown.enable,
            mousedownMode = events.onMouseDown.mode,
            mouseupEnabled = events.onMouseUp.enable,
            mouseupMode = events.onMouseUp.mode;
    
        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.attract, hoverMode)) {
            this._hoverAttract();
        } else if (mousedownEnabled && isInArray(ClickMode.attract, mousedownMode)) {
            this._mousedownAttract();
        } else if (mouseupEnabled && isInArray(ClickMode.attract, mouseupMode)) {
            this._mouseupAttract();
        }
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

        return isInArray(HoverMode.attract, hoverMode) || isInArray(ClickMode.attract, clickMode);
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

            if (!attractRadius || attractRadius < 0 || !mousePos) {
                return;
            }

            this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
        } else if (attract.clicking === false) {
            attract.particles = [];
        }

        return;
    };

    private readonly _hoverAttract: () => void = () => {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            attractRadius = container.retina.attractModeDistance;

        if (!attractRadius || attractRadius < 0 || !mousePos) {
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
            const { dx, dy, distance } = getDistances(particle.position, position);
            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = clamp(
                getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity,
                0,
                attractOptions.maxSpeed,
            );
            const normVec = Vector.create(
                distance === 0 ? velocity : (dx / distance) * attractFactor,
                distance === 0 ? velocity : (dy / distance) * attractFactor,
            );

            particle.position.subFrom(normVec);
        }
    };
}
