import { Constants, ExternalInteractorBase } from "../../../Core";
import { HoverMode, WorkerQueryType } from "../../../Enums";
import { getDistance, getLinkColor, getLinkRandomColor, isInArray } from "../../../Utils";
import type { Container } from "../../../Core";
import type { Engine } from "../../../engine";

/**
 * Particle grab manager
 * @category Interactions
 */
export class Grabber extends ExternalInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = container.actualOptions.interactivity.events;

        return events.onHover.enable && !!mouse.position && isInArray(HoverMode.grab, events.onHover.mode);
    }

    reset(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            interactivity = options.interactivity;

        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            const distance = container.retina.grabModeDistance;

            const queryId = await this.#engine.queryTree(
                {
                    containerId: container.treeId,
                    position: mousePos,
                    queryId: "external-grabber",
                    queryType: WorkerQueryType.circle,
                    radius: distance,
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

                        /*
                           draw a line between the cursor and the particle
                           if the distance between them is under the config distance
                        */
                        const pos = particle.getPosition(),
                            pointDistance = getDistance(pos, mousePos);

                        if (pointDistance <= distance) {
                            const grabLineOptions = interactivity.modes.grab.links,
                                lineOpacity = grabLineOptions.opacity,
                                opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;

                            if (opacityLine <= 0) {
                                continue;
                            }

                            const optColor = grabLineOptions.color ?? particle.options.links.color;

                            if (!container.particles.grabLineColor) {
                                const linksOptions = options.interactivity.modes.grab.links;

                                container.particles.grabLineColor = getLinkRandomColor(
                                    optColor,
                                    linksOptions.blink,
                                    linksOptions.consent
                                );
                            }

                            const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

                            if (!colorLine) {
                                return;
                            }

                            container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                        }
                    }
                }
            );
        }
    }
}
