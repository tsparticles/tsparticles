"use strict";

import {Container} from "../Container";
import {OutMode} from "../../Enums/OutMode";
import {Particle} from "../Particle";
import {Utils} from "../Utils/Utils";
import {ClickMode} from "../../Enums/Modes/ClickMode";
import {PolygonMaskType} from "../../Enums/PolygonMaskType";

/**
 * Particle updater, it manages movement
 */
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

    private move(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (options.particles.move.enable) {
            const slowFactor = this.getProximitySpeedFactor();
            const deltaFactor = (60 * delta) / 1000;
            const moveSpeed = container.retina.moveSpeed / 2 * slowFactor * deltaFactor;

            particle.position.x += particle.velocity.horizontal * moveSpeed;
            particle.position.y += particle.velocity.vertical * moveSpeed;
        }
    }

    private getProximitySpeedFactor(): number {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const active = options.interactivity.modes.slow.active;

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = particle.position;
        const dist = Utils.getDistanceBetweenCoordinates(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }

    private moveParallax(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position || {x: 0, y: 0};
        const windowDimension = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;

        if (options.interactivity.events.onHover.parallax.enable) {
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

        if (options.particles.opacity.animation.enable) {
            if (particle.opacity.status) {
                if (particle.opacity.value >= options.particles.opacity.value) {
                    particle.opacity.status = false;
                }

                particle.opacity.value += (particle.opacity.velocity || 0);
            } else {
                if (particle.opacity.value <= options.particles.opacity.animation.minimumValue) {
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

        if (options.particles.size.animation.enable) {
            if (particle.size.status) {
                if (particle.radius >= container.retina.sizeValue) {
                    particle.size.status = false;
                }

                particle.radius += (particle.size.velocity || 0);
            } else {
                if (particle.radius <= options.particles.size.animation.minimumValue) {
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
        const outMode = options.particles.move.outMode;

        let newPos;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            newPos = {
                x_left: particle.radius,
                x_right: container.canvas.dimension.width,
                y_bottom: container.canvas.dimension.height,
                y_top: particle.radius,
            };
        } else {
            newPos = {
                x_left: -particle.radius - particle.offset.x,
                x_right: container.canvas.dimension.width + particle.radius + particle.offset.x,
                y_bottom: container.canvas.dimension.height + particle.radius - particle.offset.y,
                y_top: -particle.radius - particle.offset.y,
            };
        }

        if (outMode === OutMode.destroy) {
            if (particle.position.x + particle.radius < 0 ||
                particle.position.y + particle.radius < 0 ||
                particle.position.x - particle.radius > container.canvas.dimension.width ||
                particle.position.y - particle.radius > container.canvas.dimension.height) {
                const idx = container.particles.array.indexOf(particle);
                container.particles.array.splice(idx, 1);

                /* remove the canvas if the array is empty */
                const clickMode = options.interactivity.events.onClick.mode;

                if (!container.particles.array.length && !Utils.isInArray(ClickMode.push, clickMode)) {
                    container.destroy();
                }
            }
        } else {
            if (particle.position.x - particle.radius > container.canvas.dimension.width - particle.offset.x) {
                particle.position.x = newPos.x_left;
                particle.position.y = Math.random() * container.canvas.dimension.height;
            } else if (particle.position.x + particle.radius < 0 - particle.offset.x) {
                particle.position.x = newPos.x_right;
                particle.position.y = Math.random() * container.canvas.dimension.height;
            }

            if (particle.position.y - particle.radius > container.canvas.dimension.height - particle.offset.y) {
                particle.position.y = newPos.y_top;
                particle.position.x = Math.random() * container.canvas.dimension.width;
            } else if (particle.position.y + particle.radius < 0 - particle.offset.y) {
                particle.position.y = newPos.y_bottom;
                particle.position.x = Math.random() * container.canvas.dimension.width;
            }
        }
    }

    private updateOutMode(): void {
        const container = this.container;
        const options = container.options;

        switch (options.particles.move.outMode) {
            case OutMode.bounce:
                this.updateBounce();

                break;
            case OutMode.bounceVertical:
                this.updateBounceVertical();

                break;
            case OutMode.bounceHorizontal:
                this.updateBounceHorizontal();
                break;
        }
    }

    private updateBounce(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* check bounce against polygon boundaries */
        if (options.polygon.type !== PolygonMaskType.none && options.polygon.type !== PolygonMaskType.inline) {
            if (!container.polygon.checkInsidePolygon(particle.position)) {
                particle.velocity.horizontal = -particle.velocity.horizontal + (particle.velocity.vertical / 2);
                particle.velocity.vertical = -particle.velocity.vertical + (particle.velocity.horizontal / 2);
            }
        } else if (options.polygon.type === PolygonMaskType.inline) {
            if (!particle.initialPosition) {
                particle.initialPosition = {x: 0, y: 0};
            }
            const dist = Utils.getDistanceBetweenCoordinates(particle.initialPosition, particle.position);
            if (dist > container.retina.polygonMaskMoveRadius) {
                particle.velocity.horizontal = -particle.velocity.horizontal + (particle.velocity.vertical / 2);
                particle.velocity.vertical = -particle.velocity.vertical + (particle.velocity.horizontal / 2);
            }
        } else {
            const x = particle.position.x + particle.offset.x;
            const y = particle.position.y + particle.offset.y;

            if (x + particle.radius > container.canvas.dimension.width || x - particle.radius < 0) {
                particle.velocity.horizontal = -particle.velocity.horizontal;
            }

            if (y + particle.radius > container.canvas.dimension.height || y - particle.radius < 0) {
                particle.velocity.vertical = -particle.velocity.vertical;
            }
        }
    }

    private updateBounceVertical(): void {
        const container = this.container;
        const particle = this.particle;

        if (particle.position.y + particle.radius > container.canvas.dimension.height) {
            particle.velocity.vertical = -particle.velocity.vertical;
        }

        if (particle.position.y - particle.radius < 0) {
            particle.velocity.vertical = -particle.velocity.vertical;
        }
    }

    private updateBounceHorizontal(): void {
        const container = this.container;
        const particle = this.particle;

        if (particle.position.x + particle.radius > container.canvas.dimension.width) {
            particle.velocity.horizontal = -particle.velocity.horizontal;
        } else if (particle.position.x - particle.radius < 0) {
            particle.velocity.horizontal = -particle.velocity.horizontal;
        }
    }
}
