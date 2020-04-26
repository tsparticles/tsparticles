import type { Container } from "../Container";
import { OutMode } from "../../Enums/OutMode";
import type { Particle } from "../Particle";
import { Utils } from "../Utils/Utils";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import { Mover } from "./Mover";
import { RotateDirection } from "../../Enums/RotateDirection";
import type { IBounds } from "../../Interfaces/IBounds";
import { SizeAnimationStatus } from "../../Enums/SizeAnimationStatus";
import { OpacityAnimationStatus } from "../../Enums/OpacityAnimationStatus";

/**
 * Particle updater, it manages movement
 */
export class Updater {
    private readonly particle: Particle;
    private readonly container: Container;
    private readonly mover: Mover;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
        this.mover = new Mover(container, particle);
    }

    private static checkBounds(coordinate: number,
                               radius: number,
                               size: number,
                               velocity: number,
                               outside: () => void): void {
        if ((coordinate + radius > size && velocity > 0) ||
            (coordinate - radius < 0 && velocity < 0)) {
            outside();
        }
    }

    public update(delta: number): void {
        /* move the particle */
        this.mover.move(delta);

        /* change opacity status */
        this.updateOpacity(delta);

        /* change size */
        this.updateSize(delta);

        /* change size */
        this.updateAngle(delta);

        /* change particle position if it is out of canvas */
        this.fixOutOfCanvasPosition();

        /* out of canvas modes */
        this.updateOutMode();
    }

    private updateOpacity(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const deltaFactor = options.fpsLimit > 0 ? (60 * delta) / 1000 : 3.6;

        if (particle.particlesOptions.opacity.animation.enable) {
            switch (particle.opacity.status) {
                case OpacityAnimationStatus.increasing:
                    if (particle.opacity.value >= particle.particlesOptions.opacity.value) {
                        particle.opacity.status = OpacityAnimationStatus.decreasing;
                    } else {
                        particle.opacity.value += (particle.opacity.velocity || 0) * deltaFactor;
                    }
                    break;
                case OpacityAnimationStatus.decreasing:
                    if (particle.opacity.value <= particle.particlesOptions.opacity.animation.minimumValue) {
                        particle.opacity.status = OpacityAnimationStatus.increasing;
                    } else {
                        particle.opacity.value -= (particle.opacity.velocity || 0) * deltaFactor;
                    }
                    break;
            }

            if (particle.opacity.value < 0) {
                particle.opacity.value = 0;
            }
        }
    }

    private updateSize(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const deltaFactor = options.fpsLimit > 0 ? (60 * delta) / 1000 : 3.6;

        if (particle.particlesOptions.size.animation.enable) {
            switch (particle.size.status) {
                case SizeAnimationStatus.increasing:
                    if (particle.size.value >= (particle.sizeValue ?? container.retina.sizeValue)) {
                        particle.size.status = SizeAnimationStatus.decreasing;
                    } else {
                        particle.size.value += (particle.size.velocity || 0) * deltaFactor;
                    }
                    break;
                case SizeAnimationStatus.decreasing:
                    if (particle.size.value <= particle.particlesOptions.size.animation.minimumValue) {
                        particle.size.status = SizeAnimationStatus.increasing;
                    } else {
                        particle.size.value -= (particle.size.velocity || 0) * deltaFactor;
                    }
            }

            if (particle.size.value < 0) {
                particle.size.value = 0;
            }
        }
    }

    private updateAngle(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const deltaFactor = options.fpsLimit > 0 ? (60 * delta) / 1000 : 3.6;

        if (particle.particlesOptions.rotate.animation.enable) {
            switch (particle.rotateDirection) {
                case RotateDirection.clockwise:
                    particle.angle += particle.particlesOptions.rotate.animation.speed * Math.PI / 18 * deltaFactor;

                    if (particle.angle > 360) {
                        particle.angle -= 360;
                    }
                    break;
                case RotateDirection.counterClockwise:
                default:
                    particle.angle -= particle.particlesOptions.rotate.animation.speed * Math.PI / 18 * deltaFactor;

                    if (particle.angle < 0) {
                        particle.angle += 360;
                    }
                    break;
            }
        }
    }

    private fixOutOfCanvasPosition(): void {
        const container = this.container;
        const particle = this.particle;
        const outMode = particle.particlesOptions.move.outMode;
        const canvasSize = container.canvas.size;

        let newPos: IBounds;

        if (outMode === OutMode.bounce) {
            newPos = {
                bottom: canvasSize.height,
                left: particle.size.value,
                right: canvasSize.width,
                top: particle.size.value,
            };
        } else if (outMode === OutMode.bounceHorizontal) {
            newPos = {
                bottom: canvasSize.height + particle.size.value - particle.offset.y,
                left: particle.size.value,
                right: canvasSize.width,
                top: -particle.size.value - particle.offset.y,
            };
        } else if (outMode === OutMode.bounceVertical) {
            newPos = {
                bottom: canvasSize.height,
                left: -particle.size.value - particle.offset.x,
                right: canvasSize.width + particle.size.value + particle.offset.x,
                top: particle.size.value,
            };
        } else {
            newPos = {
                bottom: canvasSize.height + particle.size.value - particle.offset.y,
                left: -particle.size.value - particle.offset.x,
                right: canvasSize.width + particle.size.value + particle.offset.x,
                top: -particle.size.value - particle.offset.y,
            };
        }

        if (outMode === OutMode.destroy) {
            const sizeValue = particle.size.value;

            if (!Utils.isPointInside(particle.position, container.canvas.size, sizeValue)) {
                container.particles.remove(particle);
            }
        } else {
            const sizeValue = particle.size.value;
            const nextBounds = Utils.calculateBounds(particle.position, sizeValue);

            if (nextBounds.left > canvasSize.width - particle.offset.x) {
                particle.position.x = newPos.left;
                particle.position.y = Math.random() * canvasSize.height;
            } else if (nextBounds.right < -particle.offset.x) {
                particle.position.x = newPos.right;
                particle.position.y = Math.random() * canvasSize.height;
            }

            if (nextBounds.top > canvasSize.height - particle.offset.y) {
                particle.position.x = Math.random() * canvasSize.width;
                particle.position.y = newPos.top;
            } else if (nextBounds.bottom < -particle.offset.y) {
                particle.position.x = Math.random() * canvasSize.width;
                particle.position.y = newPos.bottom;
            }
        }
    }

    private updateOutMode(): void {
        const particle = this.particle;

        switch (particle.particlesOptions.move.outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
                this.updateBounce();

                break;
        }
    }

    private updateBounce(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        /* check bounce against polygon boundaries */
        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
            options.polygon.type !== PolygonMaskType.inline) {
            if (!container.polygon.checkInsidePolygon(particle.position)) {
                this.polygonBounce();
            }
        } else if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
            if (particle.initialPosition) {
                const dist = Utils.getDistanceBetweenCoordinates(particle.initialPosition, particle.position);

                if (dist > container.retina.polygonMaskMoveRadius) {
                    this.polygonBounce();
                }
            }
        } else {
            const outMode = particle.particlesOptions.move.outMode;
            const x = particle.position.x + particle.offset.x;
            const y = particle.position.y + particle.offset.y;

            if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal) {
                const size = particle.size.value;
                const velocity = particle.velocity.horizontal;
                Updater.checkBounds(x, size, container.canvas.size.width, velocity, () => {
                    particle.velocity.horizontal *= -1;
                });
            }

            if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
                const size = particle.size.value;
                const velocity = particle.velocity.vertical;
                Updater.checkBounds(y, size, container.canvas.size.height, velocity, () => {
                    particle.velocity.vertical *= -1;
                });
            }
        }
    }

    private polygonBounce(): void {
        const particle = this.particle;

        particle.velocity.horizontal = -particle.velocity.horizontal + (particle.velocity.vertical / 2);
        particle.velocity.vertical = -particle.velocity.vertical + (particle.velocity.horizontal / 2);
    }
}
