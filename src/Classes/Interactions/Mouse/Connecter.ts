import type { Container } from "../../Container";
import type { IParticle } from "../../../Interfaces/IParticle";

/**
 * Particle connection manager
 */
export class Connecter {
    /**
     * Connecting particles on hover interactivity
     */
    public static connect(p1: IParticle, p2: IParticle, container: Container): void {
        const options = container.options;

        if (options.interactivity.events.onHover.enable && container.interactivity.status == 'mousemove') {
            const xDiff = Math.abs(p1.position.x - p2.position.x);
            const yDiff = Math.abs(p1.position.y - p2.position.y);
            const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
            const xCoreDiff = Math.abs(p1.position.x - mousePos.x);
            const yCoreDiff = Math.abs(p1.position.y - mousePos.y);
            const distMax = Math.abs(container.retina.connectModeDistance);
            const connectAreaRadius = Math.abs(container.retina.connectModeRadius);

            if (xDiff < distMax && yDiff < distMax && xCoreDiff < connectAreaRadius && yCoreDiff < connectAreaRadius) {
                container.canvas.drawConnectLine(p1, p2);
            }
        }
    }
}
