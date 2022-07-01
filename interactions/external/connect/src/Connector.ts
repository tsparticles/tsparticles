import type { Container, ICoordinates, Particle } from "tsparticles-engine";
import { ExternalInteractorBase, HoverMode, drawLine, gradient, isInArray } from "tsparticles-engine";

function drawConnectLine(
    context: CanvasRenderingContext2D,
    width: number,
    lineStyle: CanvasGradient,
    begin: ICoordinates,
    end: ICoordinates
): void {
    context.save();

    drawLine(context, begin, end);

    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
}

function lineStyle(
    container: Container,
    ctx: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle
): CanvasGradient | undefined {
    const options = container.actualOptions,
        connectOptions = options.interactivity.modes.connect;

    return gradient(ctx, p1, p2, connectOptions.links.opacity);
}

function drawConnection(container: Container, p1: Particle, p2: Particle): void {
    container.canvas.draw((ctx) => {
        const ls = lineStyle(container, ctx, p1, p2);

        if (!ls) {
            return;
        }

        const pos1 = p1.getPosition(),
            pos2 = p2.getPosition();

        drawConnectLine(ctx, p1.retina.linksWidth ?? container.retina.linksWidth, ls, pos1, pos2);
    });
}

/**
 * Particle connection manager
 * @category Interactions
 */
export class Connector extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    /**
     * Connecting particles on hover interactivity
     */
    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions;

        if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
            const mousePos = container.interactivity.mouse.position;

            if (!mousePos) {
                return;
            }

            const distance = Math.abs(container.retina.connectModeRadius),
                query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));

            let i = 0;

            for (const p1 of query) {
                const pos1 = p1.getPosition();

                for (const p2 of query.slice(i + 1)) {
                    const pos2 = p2.getPosition(),
                        distMax = Math.abs(container.retina.connectModeDistance),
                        xDiff = Math.abs(pos1.x - pos2.x),
                        yDiff = Math.abs(pos1.y - pos2.y);

                    if (xDiff < distMax && yDiff < distMax) {
                        drawConnection(container, p1, p2);
                    }
                }

                ++i;
            }
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? container.actualOptions.interactivity).events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        return isInArray(HoverMode.connect, events.onHover.mode);
    }

    reset(): void {
        // do nothing
    }
}
