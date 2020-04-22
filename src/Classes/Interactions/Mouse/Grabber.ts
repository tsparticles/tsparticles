import type { Container } from "../../Container";
import { Constants } from "../../Utils/Constants";

/**
 * Particle grab manager
 */
export class Grabber {
    public static grab(container: Container): void {
        const options = container.options;
        const interactivity = options.interactivity;

        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;

            if (mousePos === undefined) {
                return;
            }

            const distance = container.retina.grabModeDistance;
            const query = container.particles.spatialGrid.queryRadiusWithDistance(mousePos, distance);

            for (const { distance, particle } of query) {
                /*
                   draw a line between the cursor and the particle
                   if the distance between them is under the config distance
                */
                if (distance <= container.retina.grabModeDistance) {
                    const lineOpacity = interactivity.modes.grab.lineLinked.opacity;
                    const grabDistance = container.retina.grabModeDistance;
                    const opacityLine = lineOpacity - (distance * lineOpacity) / grabDistance;

                    if (opacityLine > 0) {
                        /* style */
                        container.canvas.drawGrabLine(particle, opacityLine, mousePos);
                    }
                }
            }
        }
    }
}
