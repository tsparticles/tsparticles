"use strict";

import { Container } from "../Container";
import { OutMode } from "../../Enums/OutMode";
import { Particle } from "../Particle";
import { Utils } from "../Utils/Utils";

export class Updater {
    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public update(delta: number): void {
        /* move the particle */
        this.move(delta);

        /* parallax */
        this.moveParallax();

        /* change opacity status */
        this.updateOpacity();

        /* change size */
        this.updateSize();

        /* change particle position if it is out of canvas */
        this.fixOutOfCanvasPosition();

        /* out of canvas modes */
        this.updateOutMode();
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
                    container.particles.lineLinkedColor = Utils.hexToRgb(options.particles.line_linked.color);
                }

                if (!container.canvas.context) {
                    return;
                }

                const ctx = container.canvas.context;

                const colorLine = container.particles.lineLinkedColor;

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

    private move(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.particles.move.enable) {
            const moveSpeed = options.particles.move.speed / 10;

            particle.position.x += particle.velocity.horizontal * moveSpeed * delta;
            particle.position.y += particle.velocity.vertical * moveSpeed * delta;
        }
    }

    private moveParallax(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onhover.parallax.force;
        const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
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

    private updateOpacity(): void {
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

    private updateSize(): void {
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

    private fixOutOfCanvasPosition(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const outMode = options.particles.move.out_mode;

        let newPos;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            newPos = {
                x_left: particle.radius,
                x_right: container.canvas.width,
                y_bottom: container.canvas.height,
                y_top: particle.radius,
            };
        } else {
            newPos = {
                x_left: -particle.radius - particle.offset.x,
                x_right: container.canvas.width + particle.radius + particle.offset.x,
                y_bottom: container.canvas.height + particle.radius - particle.offset.y,
                y_top: -particle.radius - particle.offset.y,
            };
        }

        if ((particle.position.x) - particle.radius > container.canvas.width - particle.offset.x) {
            particle.position.x = newPos.x_left;
            particle.position.y = Math.random() * container.canvas.height;
        } else if ((particle.position.x) + particle.radius < 0 - particle.offset.x) {
            particle.position.x = newPos.x_right;
            particle.position.y = Math.random() * container.canvas.height;
        }

        if ((particle.position.y) - particle.radius > container.canvas.height - particle.offset.y) {
            particle.position.y = newPos.y_top;
            particle.position.x = Math.random() * container.canvas.width;
        } else if ((particle.position.y) + particle.radius < 0 - particle.offset.y) {
            particle.position.y = newPos.y_bottom;
            particle.position.x = Math.random() * container.canvas.width;
        }
    }

    private updateOutMode(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        switch (options.particles.move.out_mode) {
            case OutMode.bounce:
                if ((particle.position.x + particle.offset.x) + particle.radius > container.canvas.width) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                } else if ((particle.position.x + particle.offset.x) - particle.radius < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }

                if ((particle.position.y + particle.offset.y) + particle.radius > container.canvas.height) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                } else if ((particle.position.y + particle.offset.y) - particle.radius < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                break;
            case OutMode.bounceVertical:
                if (particle.position.y + particle.radius > container.canvas.height) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                if (particle.position.y - particle.radius < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }

                break;
            case OutMode.bounceHorizontal:
                if (particle.position.x + particle.radius > container.canvas.width) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                } else if (particle.position.x - particle.radius < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }
                break;
        }
    }
}
