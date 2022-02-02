import { HoverMode, WorkerQueryType } from "../../../Enums";
import type { Container } from "../../../Core";
import type { Engine } from "../../../engine";
import { ExternalInteractorBase } from "../../../Core";
import { isInArray } from "../../../Utils";

/**
 * Particle connection manager
 * @category Interactions
 */
export class Connector extends ExternalInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(HoverMode.connect, events.onHover.mode);
    }

    reset(): void {
        // do nothing
    }

    /**
     * Connecting particles on hover interactivity
     */
    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            const distance = Math.abs(container.retina.connectModeRadius);

            const queryId = await this.#engine.queryTree(
                {
                    containerId: container.treeId,
                    position: mousePos,
                    queryId: "external-connector",
                    queryType: WorkerQueryType.circle,
                    radius: distance,
                },
                (containerId, qid, ids) => {
                    if (container.treeId !== containerId || queryId !== qid) {
                        return;
                    }

                    let i = 0;

                    for (const id1 of ids) {
                        const p1 = container.particles.getParticle(id1);

                        if (!p1) {
                            continue;
                        }

                        const pos1 = p1.getPosition();

                        for (const id2 of ids.slice(i + 1)) {
                            const p2 = container.particles.getParticle(id2);

                            if (!p2) {
                                continue;
                            }

                            const pos2 = p2.getPosition(),
                                distMax = Math.abs(container.retina.connectModeDistance),
                                xDiff = Math.abs(pos1.x - pos2.x),
                                yDiff = Math.abs(pos1.y - pos2.y);

                            if (xDiff < distMax && yDiff < distMax) {
                                container.canvas.drawConnectLine(p1, p2);
                            }
                        }

                        ++i;
                    }
                }
            );
        }
    }
}
