import type { Container } from "../../Core/Container";
import { Constants, Utils, ColorUtils, NumberUtils } from "../../Utils";
import { HoverMode } from "../../Enums/Modes";
import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";

/**
 * Particle grab manager
 * @category Interactions
 */
export class Grabber implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.actualOptions.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return Utils.isInArray(HoverMode.grab, hoverMode);
    }

    public reset(): void {
        // do nothing
    }

    public interact(): void {
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
                const pointDistance = NumberUtils.getDistance(pos, mousePos);

                if (pointDistance <= distance) {
                    const grabLineOptions = interactivity.modes.grab.links;
                    const lineOpacity = grabLineOptions.opacity;
                    const opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;

                    if (opacityLine > 0) {
                        /* style */
                        const optColor = grabLineOptions.color ?? particle.particlesOptions.links.color;

                        if (!container.particles.grabLineColor) {
                            const linksOptions = container.actualOptions.interactivity.modes.grab.links;

                            container.particles.grabLineColor = ColorUtils.getLinkRandomColor(
                                optColor,
                                linksOptions.blink,
                                linksOptions.consent
                            );
                        }

                        const colorLine = ColorUtils.getLinkColor(
                            particle,
                            undefined,
                            container.particles.grabLineColor
                        );

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
