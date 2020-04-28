import type { Container } from "../../Container";

/**
 * Particle connection manager
 */
export class Connector {
    /**
     * Connecting particles on hover interactivity
     */
    public static connect(container: Container): void {
        const options = container.options;

        if (options.interactivity.events.onHover.enable && container.interactivity.status == 'mousemove') {
            const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
            const distance = Math.abs(container.retina.connectModeRadius);

            const query = container.particles.spatialGrid.queryRadius(mousePos, distance);

            let i = 0;
            for (const p1 of query) {
                const pos1 = {
                    x: p1.position.x + p1.offset.x,
                    y: p1.position.y + p1.offset.y
                };

                for (const p2 of query.slice(i + 1)) {
                    const pos2 = {
                        x: p2.position.x + p2.offset.x,
                        y: p2.position.y + p2.offset.y
                    };

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
