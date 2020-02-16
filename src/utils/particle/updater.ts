import { Container } from "../../classes/container";
import { OutMode } from "../enums";
import { Particle } from "../../classes/particle";
import { Utils } from "../utils";

export class Updater {
    private readonly particle: Particle;
    private readonly container: Container;

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
                if (!container.particles.line_linked_color) {
                    container.particles.line_linked_color = Utils.hexToRgb(options.particles.line_linked.color);
                }

                if (!container.canvas.ctx) {
                    return;
                }

                const ctx = container.canvas.ctx;

                const colorLine = container.particles.line_linked_color;

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

    public attract(p2: Particle): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* condensed particles */
        const dx = particle.position.x - p2.position.x;
        const dy = particle.position.y - p2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= options.particles.line_linked.distance) {
            const ax = dx / (options.particles.move.attract.rotateX * 1000);
            const ay = dy / (options.particles.move.attract.rotateY * 1000);

            particle.velocity.horizontal -= ax;
            particle.velocity.vertical -= ay;
            p2.velocity.horizontal += ax;
            p2.velocity.vertical += ay;
        }
    }

    public bounce(p2: Particle): void {
        const particle = this.particle;

        const dx = particle.position.x - p2.position.x;
        const dy = particle.position.y - p2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distP = particle.radius + p2.radius;

        if (dist <= distP) {
            particle.velocity.horizontal = -particle.velocity.horizontal;
            particle.velocity.vertical = -particle.velocity.vertical;
            p2.velocity.horizontal = -p2.velocity.horizontal;
            p2.velocity.vertical = -p2.velocity.vertical;
        }
    }

    public move(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.particles.move.enable) {
            const moveSpeed = options.particles.move.speed / 10;

            particle.position.x += particle.velocity.horizontal * moveSpeed * delta;
            particle.position.y += particle.velocity.vertical * moveSpeed * delta;
        }
    }

    public moveParallax(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onhover.parallax.force;
        const mousePos = {
            x: container.interactivity.mouse.pos_x || 0,
            y: container.interactivity.mouse.pos_y || 0,
        };
        const windowDimension = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2,
        };
        const parallaxSmooth = options.interactivity.events.onhover.parallax.smooth;

        if (options.interactivity.events.onhover.parallax.enable) {
            /* smaller is the particle, longer is the offset distance */
            const tmp = {
                x: (mousePos.x - windowDimension.width) * (particle.radius / parallaxForce),
                y: (mousePos.y - windowDimension.height) * (particle.radius / parallaxForce),
            };

            particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
            particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
        }
    }

    public updateOpacity(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.particles.opacity.anim.enable) {
            if (particle.opacity.status) {
                if (particle.opacity.value >= options.particles.opacity.value) {
                    particle.opacity.status = false;
                }

                particle.opacity.value += (particle.opacity.velocity || 0);
            } else {
                if (particle.opacity.value <= options.particles.opacity.anim.opacity_min) {
                    particle.opacity.status = true;
                }

                particle.opacity.value -= (particle.opacity.velocity || 0);
            }

            if (particle.opacity.value < 0) {
                particle.opacity.value = 0;
            }
        }
    }

    public updateSize(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.particles.size.anim.enable) {
            if (particle.size.status) {
                if (particle.radius >= options.particles.size.value) {
                    particle.size.status = false;
                }

                particle.radius += (particle.size.velocity || 0);
            } else {
                if (particle.radius <= options.particles.size.anim.size_min) {
                    particle.size.status = true;
                }

                particle.radius -= (particle.size.velocity || 0);
            }

            if (particle.radius < 0) {
                particle.radius = 0;
            }
        }
    }

    public fixOutOfCanvasPosition(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const outMode = options.particles.move.out_mode;

        let newPos;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            newPos = {
                x_left: particle.radius,
                x_right: container.canvas.w,
                y_bottom: container.canvas.h,
                y_top: particle.radius,
            };
        } else {
            newPos = {
                x_left: -particle.radius - particle.offset.x,
                x_right: container.canvas.w + particle.radius + particle.offset.x,
                y_bottom: container.canvas.h + particle.radius - particle.offset.y,
                y_top: -particle.radius - particle.offset.y,
            };
        }

        if ((particle.position.x) - particle.radius > container.canvas.w - particle.offset.x) {
            particle.position.x = newPos.x_left;
            particle.position.y = Math.random() * container.canvas.h;
        } else if ((particle.position.x) + particle.radius < 0 - particle.offset.x) {
            particle.position.x = newPos.x_right;
            particle.position.y = Math.random() * container.canvas.h;
        }

        if ((particle.position.y) - particle.radius > container.canvas.h - particle.offset.y) {
            particle.position.y = newPos.y_top;
            particle.position.x = Math.random() * container.canvas.w;
        } else if ((particle.position.y) + particle.radius < 0 - particle.offset.y) {
            particle.position.y = newPos.y_bottom;
            particle.position.x = Math.random() * container.canvas.w;
        }
    }

    public updateOutMode(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        switch (options.particles.move.out_mode) {
            case OutMode.bounce:
                if ((particle.position.x + particle.offset.x) + particle.radius > container.canvas.w) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                } else if ((particle.position.x + particle.offset.x) - particle.radius < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }

                if ((particle.position.y + particle.offset.y) + particle.radius > container.canvas.h) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                } else if ((particle.position.y + particle.offset.y) - particle.radius < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                break;
            case OutMode.bounceVertical:
                if (particle.position.y + particle.radius > container.canvas.h) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                if (particle.position.y - particle.radius < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                break;
            case OutMode.bounceHorizontal:
                if (particle.position.x + particle.radius > container.canvas.w) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                } else if (particle.position.x - particle.radius < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }
                break;
        }
    }
}
