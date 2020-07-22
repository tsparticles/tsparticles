import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Utils } from "../../Utils";
import { DestroyType, OpacityAnimationStatus, OutMode, RotateDirection, SizeAnimationStatus } from "../../Enums";
import type { IDelta } from "../Interfaces/IDelta";

/**
 * Particle updater, it manages movement
 */
export class Updater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public update(delta: IDelta): void {
        if (this.particle.destroyed) {
            return;
        }

        /* change opacity status */
        this.updateOpacity(delta);

        /* change size */
        this.updateSize(delta);

        /* change size */
        this.updateAngle(delta);

        /* change color */
        this.updateColor(delta);

        /* change stroke color */
        this.updateStrokeColor(delta);

        /* out of canvas modes */
        this.updateOutMode(delta);
    }

    private updateOpacity(delta: IDelta): void {
        const particle = this.particle;

        if (particle.particlesOptions.opacity.animation.enable) {
            switch (particle.opacity.status) {
                case OpacityAnimationStatus.increasing:
                    if (particle.opacity.value >= particle.particlesOptions.opacity.value) {
                        particle.opacity.status = OpacityAnimationStatus.decreasing;
                    } else {
                        particle.opacity.value += (particle.opacity.velocity || 0) * delta.factor;
                    }
                    break;
                case OpacityAnimationStatus.decreasing:
                    if (particle.opacity.value <= particle.particlesOptions.opacity.animation.minimumValue) {
                        particle.opacity.status = OpacityAnimationStatus.increasing;
                    } else {
                        particle.opacity.value -= (particle.opacity.velocity || 0) * delta.factor;
                    }
                    break;
            }

            if (particle.opacity.value < 0) {
                particle.opacity.value = 0;
            }
        }
    }

    private updateSize(delta: IDelta): void {
        const container = this.container;
        const particle = this.particle;
        const sizeOpt = particle.particlesOptions.size;
        const sizeAnim = sizeOpt.animation;

        if (sizeAnim.enable) {
            switch (particle.size.status) {
                case SizeAnimationStatus.increasing:
                    if (particle.size.value >= (particle.sizeValue ?? container.retina.sizeValue)) {
                        particle.size.status = SizeAnimationStatus.decreasing;
                    } else {
                        particle.size.value += (particle.size.velocity || 0) * delta.factor;
                    }
                    break;
                case SizeAnimationStatus.decreasing:
                    if (particle.size.value <= sizeAnim.minimumValue) {
                        particle.size.status = SizeAnimationStatus.increasing;
                    } else {
                        particle.size.value -= (particle.size.velocity || 0) * delta.factor;
                    }
            }

            switch (sizeAnim.destroy) {
                case DestroyType.max:
                    if (particle.size.value >= sizeOpt.value * container.retina.pixelRatio) {
                        particle.destroy();
                    }
                    break;
                case DestroyType.min:
                    if (particle.size.value <= sizeAnim.minimumValue * container.retina.pixelRatio) {
                        particle.destroy();
                    }
                    break;
            }

            if (particle.size.value < 0 && !particle.destroyed) {
                particle.size.value = 0;
            }
        }
    }

    private updateAngle(delta: IDelta): void {
        const particle = this.particle;
        const rotate = particle.particlesOptions.rotate;
        const rotateAnimation = rotate.animation;
        const speed = (rotateAnimation.speed / 360) * delta.factor;
        const max = 2 * Math.PI;

        if (rotate.path) {
            particle.pathAngle = Math.atan2(particle.velocity.vertical, particle.velocity.horizontal);
        } else {
            if (rotateAnimation.enable) {
                switch (particle.rotateDirection) {
                    case RotateDirection.clockwise:
                        particle.angle += speed;

                        if (particle.angle > max) {
                            particle.angle -= max;
                        }
                        break;
                    case RotateDirection.counterClockwise:
                    default:
                        particle.angle -= speed;

                        if (particle.angle < 0) {
                            particle.angle += max;
                        }
                        break;
                }
            }
        }
    }

    private updateColor(delta: IDelta): void {
        const particle = this.particle;

        if (particle.color === undefined) {
            return;
        }

        if (particle.particlesOptions.color.animation.enable) {
            particle.color.h += (particle.colorVelocity || 0) * delta.factor;

            if (particle.color.h > 360) {
                particle.color.h -= 360;
            }
        }
    }

    private updateStrokeColor(delta: IDelta): void {
        const particle = this.particle;

        const color = particle.stroke.color;

        if (typeof color === "string" || color === undefined) {
            return;
        }

        if (particle.strokeColor === undefined) {
            return;
        }

        if (color.animation.enable) {
            particle.strokeColor.h += (particle.colorVelocity || 0) * delta.factor;

            if (particle.strokeColor.h > 360) {
                particle.strokeColor.h -= 360;
            }
        }
    }

    private fixOutOfCanvasPosition(): void {
        const container = this.container;
        const particle = this.particle;
        const wrap = particle.particlesOptions.move.warp;
        const canvasSize = container.canvas.size;
        const newPos = {
            bottom: canvasSize.height + particle.size.value - particle.offset.y,
            left: -particle.size.value - particle.offset.x,
            right: canvasSize.width + particle.size.value + particle.offset.x,
            top: -particle.size.value - particle.offset.y,
        };

        const sizeValue = particle.size.value;
        const nextBounds = Utils.calculateBounds(particle.position, sizeValue);

        if (nextBounds.left > canvasSize.width - particle.offset.x) {
            particle.position.x = newPos.left;

            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        } else if (nextBounds.right < -particle.offset.x) {
            particle.position.x = newPos.right;

            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        }

        if (nextBounds.top > canvasSize.height - particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }

            particle.position.y = newPos.top;
        } else if (nextBounds.bottom < -particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }

            particle.position.y = newPos.bottom;
        }
    }

    private updateOutMode(delta: IDelta): void {
        const container = this.container;
        const particle = this.particle;

        switch (particle.particlesOptions.move.outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
                this.updateBounce(delta);

                break;
            case OutMode.destroy:
                if (!Utils.isPointInside(particle.position, container.canvas.size, particle.size.value)) {
                    particle.destroy();
                    container.particles.remove(particle);
                    return;
                }
                break;
            case OutMode.out:
                if (!Utils.isPointInside(particle.position, container.canvas.size, particle.size.value)) {
                    this.fixOutOfCanvasPosition();
                }
        }
    }

    private updateBounce(delta: IDelta): void {
        const container = this.container;
        const particle = this.particle;
        let handled = false;

        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta);
            }

            if (handled) {
                break;
            }
        }

        if (handled) {
            return;
        }

        const outMode = particle.particlesOptions.move.outMode,
            pos = particle.getPosition(),
            offset = particle.offset,
            size = particle.size.value,
            bounds = Utils.calculateBounds(pos, size),
            canvasSize = container.canvas.size;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal) {
            const velocity = particle.velocity.horizontal;

            if ((bounds.right >= canvasSize.width && velocity > 0) || (bounds.left <= 0 && velocity < 0)) {
                particle.velocity.horizontal *= -1;
            }

            const minPos = offset.x + size;

            if (bounds.right >= canvasSize.width) {
                particle.position.x = canvasSize.width - minPos;
            } else if (bounds.left <= 0) {
                particle.position.x = minPos;
            }
        }

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            const velocity = particle.velocity.vertical;

            if ((bounds.bottom >= container.canvas.size.height && velocity > 0) || (bounds.top <= 0 && velocity < 0)) {
                particle.velocity.vertical *= -1;
            }

            const minPos = offset.y + size;

            if (bounds.bottom >= canvasSize.height) {
                particle.position.y = canvasSize.height - minPos;
            } else if (bounds.top <= 0) {
                particle.position.y = minPos;
            }
        }
    }
}
