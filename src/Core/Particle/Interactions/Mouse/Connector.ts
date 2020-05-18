import type { Container } from "../../../Container";
import { Circle } from "../../../../Utils";

/**
 * Particle connection manager
 */
export class Connector {
    /**
     * Connecting particles on hover interactivity
     */
    public static connect(container: Container, _delta: number): void {
        const options = container.options;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            const distance = Math.abs(container.retina.connectModeRadius);

            //const query = container.particles.spatialGrid.queryRadius(mousePos, distance);
            const query = container.particles.quadTree.query(new Circle(mousePos.x, mousePos.y, distance));

            let i = 0;
            for (const p1 of query) {
                const pos1 = p1.getPosition();

                for (const p2 of query.slice(i + 1)) {
                    const pos2 = p2.getPosition();

                    const distMax = Math.abs(container.retina.connectModeDistance);
                    const xDiff = Math.abs(pos1.x - pos2.x);
                    const yDiff = Math.abs(pos1.y - pos2.y);

                    if (xDiff < distMax && yDiff < distMax) {
                        container.canvas.drawConnectLine(p1, p2);
                    }
                }

                ++i;
            }
        }
    }
}
