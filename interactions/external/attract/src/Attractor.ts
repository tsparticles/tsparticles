import type { AttractContainer, AttractMode, IAttractMode } from "./Types.js";
import {
    Circle,
    type Engine,
    ExternalInteractorBase,
    type IModes,
    type Modes,
    type Particle,
    type RecursivePartial,
    isInArray,
    millisecondsToSeconds,
    mouseMoveEvent,
} from "@tsparticles/engine";
import { Attract } from "./Options/Classes/Attract.js";

const attractMode = "attract",
    minRadius = 0;

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
            { enable: hoverEnabled, mode: hoverMode } = events.onHover,
            { enable: clickEnabled, mode: clickMode } = events.onClick;

        if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
            await this._hoverAttract();
        } else if (clickEnabled && isInArray(attractMode, clickMode)) {
            await this._clickAttract();
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

    private async _clickAttract(): Promise<void> {
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

            const { processAttract } = await import("./Utils.js");

            processAttract(
                container,
                mousePos,
                attractRadius,
                new Circle(mousePos.x, mousePos.y, attractRadius),
                (p: Particle) => this.isEnabled(p),
            );
        } else if (attract.clicking === false) {
            attract.particles = [];
        }
    }

    private async _hoverAttract(): Promise<void> {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            attractRadius = container.retina.attractModeDistance;

        if (!attractRadius || attractRadius < minRadius || !mousePos) {
            return;
        }

        const { processAttract } = await import("./Utils.js");

        processAttract(
            container,
            mousePos,
            attractRadius,
            new Circle(mousePos.x, mousePos.y, attractRadius),
            (p: Particle) => this.isEnabled(p),
        );
    }
}
