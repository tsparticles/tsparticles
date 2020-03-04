import {Particle} from "../Particle";
import {Utils} from "../Utils/Utils";
import {IRgb} from "../../Interfaces/IRgb";
import {Container} from "../Container";

export class Linker {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public link(p2: Particle): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const x1 = particle.position.x + particle.offset.x;
        const x2 = p2.position.x + p2.offset.x;
        const dx = x1 - x2;
        const y1 = particle.position.y + particle.offset.y;
        const y2 = p2.position.y + p2.offset.y;
        const dy = y1 - y2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const optOpacity = options.particles.line_linked.opacity;
        const optDistance = options.particles.line_linked.distance;

        /* draw a line between p1 and p2 if the distance between them is under the config distance */
        if (dist <= optDistance) {
            const opacityLine = optOpacity - (dist * optOpacity) / optDistance;

            if (opacityLine > 0) {
                /* style */
                if (!container.particles.lineLinkedColor) {
                    const color = options.particles.line_linked.color;

                    /* particles.line_linked - convert hex colors to rgb */
                    //  check for the color profile requested and
                    //  then return appropriate value

                    if (color === "random") {
                        if (options.particles.line_linked.consent) {
                            container.particles.lineLinkedColor = Utils.hexToRgb(color);
                        } else if (options.particles.line_linked.blink) {
                            container.particles.lineLinkedColor = "random";
                        } else {
                            container.particles.lineLinkedColor = "mid";
                        }
                    } else {
                        container.particles.lineLinkedColor = Utils.hexToRgb(color);
                    }
                }

                if (!container.canvas.context) {
                    return;
                }

                const ctx = container.canvas.context;

                let colorLine: IRgb | undefined;

                /*
                 * particles connecting line color:
                 *
                 *  random: in blink mode : in every frame refresh the color would change
                 *          hence resulting blinking of lines
                 *  mid: in consent mode: sample particles color and get a mid level color
                 *                        from those two for the connecting line color
                 */

                if (container.particles.lineLinkedColor === "random") {
                    colorLine = Utils.getRandomColorRGBA();
                } else if (container.particles.lineLinkedColor == "mid" && particle.color && p2.color) {
                    const sourceColor = particle.color;
                    const destColor = p2.color;

                    colorLine = {
                        b: Math.floor(Utils.mixComponents(sourceColor.b, destColor.b, particle.radius, p2.radius)),
                        g: Math.floor(Utils.mixComponents(sourceColor.g, destColor.g, particle.radius, p2.radius)),
                        r: Math.floor(Utils.mixComponents(sourceColor.r, destColor.r, particle.radius, p2.radius)),
                    };
                } else {
                    colorLine = container.particles.lineLinkedColor as IRgb;
                }

                if (colorLine) {
                    ctx.strokeStyle = `rgba(${colorLine.r},${colorLine.g},${colorLine.b},${opacityLine})`;
                }

                ctx.lineWidth = options.particles.line_linked.width;
                // container.canvas.ctx.lineCap = "round"; /* performance issue */
                /* path */
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
