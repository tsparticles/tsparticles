import type { Container } from "../../Core/Container";
import { Constants, getLinkRandomColor, getLinkColor, getDistance, isInArray } from "../../Utils";
import { HoverMode } from "../../Enums";
import { ExternalInteractorBase } from "../../Core/ExternalInteractorBase";

/**
 * Particle grab manager
 * @category Interactions
 */
export class Grabber extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return isInArray(HoverMode.grab, hoverMode);
    }

    reset(): void {
        // do nothing
    }

    interact(): void {
        const container = this.container;
        const options = container.actualOptions;
        const interactivity = options.interactivity;

        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;

            if (mousePos === undefined) {
                return;
            }

            const distance = container.retina.grabModeDistance;
            const query = container.particles.quadTree.queryCircle(mousePos, distance);

            for (const particle of query) {
                /*
                   draw a line between the cursor and the particle
                   if the distance between them is under the config distance
                */
                const pos = particle.getPosition();
                const pointDistance = getDistance(pos, mousePos);

                if (pointDistance <= distance) {
                    const grabLineOptions = interactivity.modes.grab.links;
                    const lineOpacity = grabLineOptions.opacity;
                    const opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;

                    if (opacityLine > 0) {
                        /* style */
                        const optColor = grabLineOptions.color ?? particle.options.links.color;

                        if (!container.particles.grabLineColor) {
                            const linksOptions = container.actualOptions.interactivity.modes.grab.links;

                            container.particles.grabLineColor = getLinkRandomColor(
                                optColor,
                                linksOptions.blink,
                                linksOptions.consent
                            );
                        }

                        const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

                        if (colorLine === undefined) {
                            return;
                        }

                        container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                    }
                }
            }
        }
    }
}
