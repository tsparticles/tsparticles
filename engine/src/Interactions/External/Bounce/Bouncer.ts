import { Constants, ExternalInteractorBase, IDimension, Vector } from "../../../Core";
import type { Container, ICoordinates } from "../../../Core";
import { DivMode, DivType, HoverMode, WorkerQueryType } from "../../../Enums";
import {
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    divModeExecute,
    isDivModeEnabled,
    isInArray,
    rectBounce,
} from "../../../Utils";
import { DivEvent } from "../../../Options/Classes/Interactivity/Events/DivEvent";
import type { Engine } from "../../../engine";

export class Bouncer extends ExternalInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = options.interactivity.events,
            divs = events.onDiv;

        return (
            (mouse.position && events.onHover.enable && isInArray(HoverMode.bounce, events.onHover.mode)) ||
            isDivModeEnabled(DivMode.bounce, divs)
        );
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            events = options.interactivity.events,
            mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.bounce, hoverMode)) {
            await this.processMouseBounce();
        } else {
            divModeExecute(DivMode.bounce, divs, (selector, div): void => this.singleSelectorBounce(selector, div));
        }
    }

    reset(): void {
        // do nothing
    }

    private async processMouseBounce(): Promise<void> {
        const container = this.container,
            pxRatio = container.retina.pixelRatio,
            tolerance = 10 * pxRatio,
            mousePos = container.interactivity.mouse.position,
            radius = container.retina.bounceModeDistance;

        if (mousePos) {
            await this.processBounce(mousePos, radius, WorkerQueryType.circle, mousePos, radius + tolerance);
        }
    }

    private singleSelectorBounce(selector: string, div: DivEvent): void {
        const container = this.container;
        const query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach(async (item) => {
            const elem = item as HTMLElement,
                pxRatio = container.retina.pixelRatio,
                pos = {
                    x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
                },
                radius = (elem.offsetWidth / 2) * pxRatio,
                tolerance = 10 * pxRatio;

            if (div.type === DivType.circle) {
                await this.processBounce(pos, radius, WorkerQueryType.circle, pos, radius + tolerance);
            } else {
                await this.processBounce(
                    pos,
                    radius,
                    WorkerQueryType.rectangle,
                    {
                        x: elem.offsetLeft * pxRatio - tolerance,
                        y: elem.offsetTop * pxRatio - tolerance,
                    },
                    undefined,
                    {
                        width: elem.offsetWidth * pxRatio + tolerance * 2,
                        height: elem.offsetHeight * pxRatio + tolerance * 2,
                    }
                );
            }
        });
    }

    private async processBounce(
        position: ICoordinates,
        radius: number,
        areaType: WorkerQueryType,
        areaPosition: ICoordinates,
        areaRadius?: number,
        areaSize?: IDimension
    ): Promise<void> {
        const container = this.container;

        const queryId = await this.#engine.queryTree(
            {
                containerId: container.treeId,
                position: areaPosition,
                radius: areaRadius,
                queryType: areaType,
                queryId: "external-bouncer",
                size: areaSize,
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

                    if (areaType === WorkerQueryType.circle) {
                        circleBounce(circleBounceDataFromParticle(particle), {
                            position,
                            radius,
                            mass: (radius ** 2 * Math.PI) / 2,
                            velocity: Vector.origin,
                            factor: Vector.origin,
                        });
                    } else if (areaType === WorkerQueryType.rectangle) {
                        rectBounce(particle, calculateBounds(position, radius));
                    }
                }
            }
        );
    }
}
