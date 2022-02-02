import { ClickMode, HoverMode, WorkerQueryType } from "../../../Enums";
import { Constants, ExternalInteractorBase, Vector } from "../../../Core";
import type { Container, ICoordinates } from "../../../Core";
import { calcEasing, clamp, getDistances, isInArray } from "../../../Utils";
import type { Engine } from "../../../engine";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Attractor extends ExternalInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = options.interactivity.events;

        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(HoverMode.attract, hoverMode) || isInArray(ClickMode.attract, clickMode);
    }

    reset(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent,
            events = options.interactivity.events,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            clickEnabled = events.onClick.enable,
            clickMode = events.onClick.mode;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.attract, hoverMode)) {
            await this.hoverAttract();
        } else if (clickEnabled && isInArray(ClickMode.attract, clickMode)) {
            await this.clickAttract();
        }
    }

    private async hoverAttract(): Promise<void> {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const attractRadius = container.retina.attractModeDistance;

        await this.processAttract(mousePos, attractRadius, mousePos, attractRadius);
    }

    private async processAttract(
        position: ICoordinates,
        attractRadius: number,
        mousePos: ICoordinates,
        radius: number
    ): Promise<void> {
        const container = this.container;
        const attractOptions = container.actualOptions.interactivity.modes.attract;

        const queryId = await this.#engine.queryTree(
            {
                queryId: "external-attractor",
                queryType: WorkerQueryType.circle,
                radius: radius,
                position: mousePos,
                containerId: container.treeId,
            },
            (containerId, qid, ids) => {
                if (container.treeId !== containerId || queryId !== qid) {
                    return;
                }

                for (const id of ids) {
                    const particle = container.particles.getParticle(id);

                    if (!particle) {
                        continue;
                    }

                    const { dx, dy, distance } = getDistances(particle.position, position);
                    const velocity = attractOptions.speed * attractOptions.factor;
                    const attractFactor = clamp(
                        calcEasing(1 - distance / attractRadius, attractOptions.easing) * velocity,
                        0,
                        attractOptions.maxSpeed
                    );
                    const normVec = Vector.create(
                        distance === 0 ? velocity : (dx / distance) * attractFactor,
                        distance === 0 ? velocity : (dy / distance) * attractFactor
                    );

                    particle.position.subFrom(normVec);
                }
            }
        );
    }

    private async clickAttract(): Promise<void> {
        const container = this.container;

        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }

            container.attract.count++;

            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }

        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;

            if (!mousePos) {
                return;
            }

            const attractRadius = container.retina.attractModeDistance;

            await this.processAttract(mousePos, attractRadius, mousePos, attractRadius);
        } else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }

        return;
    }
}
