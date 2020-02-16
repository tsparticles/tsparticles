import { Container } from "../../classes/container";
import { Particle } from "../../classes/particle";
import { Utils } from "../utils";

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

        if (options.interactivity.events.onhover.enable && container.interactivity.status === "mousemove") {
            const dxMouse = particle.position.x - (container.interactivity.mouse.pos_x || 0);
            const dyMouse = particle.position.y - (container.interactivity.mouse.pos_y || 0);
            const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            /*
               draw a line between the cursor and the particle
               if the distance between them is under the config distance
            */
            if (distMouse <= options.interactivity.modes.grab.distance) {
                const lineOpacity = options.interactivity.modes.grab.line_linked.opacity;
                const grabDistance = options.interactivity.modes.grab.distance;
                const opacityLine = lineOpacity - (distMouse / (1 / lineOpacity)) / grabDistance;

                if (opacityLine > 0) {
                    /* style */
                    const optColor = options.particles.line_linked.color;
                    const lineColor = container.particles.line_linked_color || Utils.hexToRgb(optColor);

                    container.particles.line_linked_color = lineColor;

                    const colorLine = container.particles.line_linked_color || { r: 127, g: 127, b: 127 };

                    const ctx = container.canvas.ctx;

                    if (ctx) {
                        const strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacityLine})`;
                        ctx.strokeStyle = strokeStyle;
                        ctx.lineWidth = options.particles.line_linked.width;
                        // container.canvas.ctx.lineCap = "round"; /* performance issue */
                        /* path */
                        ctx.beginPath();
                        ctx.moveTo(particle.position.x + particle.offset.x, particle.position.y + particle.offset.y);

                        const mousePos = {
                            x: (container.interactivity.mouse.pos_x || 0),
                            y: (container.interactivity.mouse.pos_y || 0),
                        };

                        ctx.lineTo(mousePos.x, mousePos.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
    }
}
