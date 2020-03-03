import {Particle} from "../Particle";
import {Container} from "../Container";
import {Utils} from "../Utils/Utils";

/**
 * Particle connection manager
 */
export class Connecter {
    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    /**
     * Connecting particles on hover interactivity
     */
    public connect(destParticle: Particle): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        const ctx = container.canvas.context;

        if (!ctx) return;

        if (options.interactivity.events.onhover.enable && container.interactivity.status == 'mousemove') {
            const xDiff = Math.abs(particle.position.x - destParticle.position.x);
            const yDiff = Math.abs(particle.position.y - destParticle.position.y);
            const mousePos = container.interactivity.mouse.position || {x: 0, y: 0};
            const xCoreDiff = Math.abs(particle.position.x - mousePos.x);
            const yCoreDiff = Math.abs(particle.position.y - mousePos.y);
            const distMax = Math.abs(options.interactivity.modes.connect.distance);
            const connectAreaRadius = Math.abs(options.interactivity.modes.connect.radius);

            if (xDiff < distMax && yDiff < distMax && xCoreDiff < connectAreaRadius && yCoreDiff < connectAreaRadius) {
                const lineStyle = this.lineStyle(destParticle);

                if (!lineStyle) return;

                ctx.beginPath();
                ctx.strokeStyle = lineStyle;
                ctx.moveTo(particle.position.x, particle.position.y);
                ctx.lineTo(destParticle.position.x, destParticle.position.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    private lineStyle(destParticle: Particle): CanvasGradient | undefined {
        const particle = this.particle;

        if (particle.color && destParticle.color) {
            const sourceRgb = particle.color;
            const destRgb = destParticle.color;

            const rgb = {
                b: Utils.mixComponents(sourceRgb.b, destRgb.b, particle.radius, destParticle.radius),
                g: Utils.mixComponents(sourceRgb.g, destRgb.g, particle.radius, destParticle.radius),
                r: Utils.mixComponents(sourceRgb.r, destRgb.r, particle.radius, destParticle.radius),
            };

            const midColor = Utils.getStyleFromColor(rgb);

            return this.gradient(destParticle, midColor);
        }
    }

    private gradient(destParticle: Particle, midColor: string): CanvasGradient | undefined {
        const container = this.container;
        const particle = this.particle;
        const gradStop = Math.floor(destParticle.radius / particle.radius);
        const ctx = container.canvas.context;

        if (!ctx || !particle.color || !destParticle.color) return;

        const sourcePos = particle.position;
        const destPos = destParticle.position;

        const grad = ctx.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

        grad.addColorStop(0, Utils.getStyleFromColor(particle.color));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, midColor);
        grad.addColorStop(1, Utils.getStyleFromColor(destParticle.color));

        return grad;
    }
}
