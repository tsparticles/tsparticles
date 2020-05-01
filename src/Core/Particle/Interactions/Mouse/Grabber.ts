import type { Container } from "../../../Container";
import { Constants } from "../../../../Utils/Constants";
import { Circle } from "../../../../Utils/QuadTree";
import { Utils } from "../../../../Utils/Utils";

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
            //const query = container.particles.spatialGrid.queryRadiusWithDistance(mousePos, distance);
            const query = container.particles.quadTree.query(new Circle(mousePos.x, mousePos.y, distance));

            //for (const { distance, particle } of query) {
            for (const particle of query) {
                /*
                   draw a line between the cursor and the particle
                   if the distance between them is under the config distance
                */
                const pos = {
                    x: particle.position.x + particle.offset.x,
                    y: particle.position.y + particle.offset.y,
                };
                const distance = Utils.getDistanceBetweenCoordinates(pos,  mousePos);

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
