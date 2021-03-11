import type { Container } from "tsparticles-engine";
import { HoverMode, isInArray, ExternalInteractorBase } from "tsparticles-engine";

/**
 * Particle connection manager
 * @category Interactions
 */
export class Connector extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    public isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.options.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return isInArray(HoverMode.connect, hoverMode);
    }

    public reset(): void {
        // do nothing
    }

    /**
     * Connecting particles on hover interactivity
     */
    public interact(): void {
        const container = this.container;
        const options = container.options;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            const distance = Math.abs(container.retina.connectModeRadius);
            const query = container.particles.quadTree.queryCircle(mousePos, distance);

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
