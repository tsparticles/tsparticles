import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Utils } from "../Utils/Utils";
import { Constants } from "../Utils/Constants";

/**
 * Particle grab manager
 */
export class Grabber {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public grab(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const interactivity = options.interactivity;

        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
            const distMouse = Utils.getDistanceBetweenCoordinates(particle.position, mousePos);
            /*
               draw a line between the cursor and the particle
               if the distance between them is under the config distance
            */
            if (distMouse <= container.retina.grabModeDistance) {
                const lineOpacity = interactivity.modes.grab.lineLinked.opacity;
                const grabDistance = container.retina.grabModeDistance;
                const opacityLine = lineOpacity - (distMouse * lineOpacity) / grabDistance;

                if (opacityLine > 0) {
                    /* style */
                    container.canvas.drawGrabLine(particle, opacityLine, mousePos);
                }
            }
        }
    }
}
