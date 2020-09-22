import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { NumberUtils, Utils } from "../../Utils";
import {
    DestroyType,
    OpacityAnimationStatus,
    OutMode,
    OutModeAlt,
    RotateDirection,
    SizeAnimationStatus,
} from "../../Enums";
import type { IDelta } from "../Interfaces/IDelta";
import { OutModeDirection } from "../../Enums/Directions/OutModeDirection";

/**
 * Particle updater, it manages movement
 * @category Core
 */
export class Updater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public update(delta: IDelta): void {
        if (this.particle.destroyed) {
            return;
        }

        this.updateLife(delta);

        if (this.particle.destroyed || this.particle.spawning) {
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
        this.updateOutModes(delta);
    }

    private updateLife(delta: IDelta): void {
        const particle = this.particle;
        let justSpawned = false;

        if (particle.spawning) {
            particle.lifeDelayTime += delta.value;

            if (particle.lifeDelayTime >= particle.lifeDelay) {
                justSpawned = true;
                particle.spawning = false;
                particle.lifeDelayTime = 0;
                particle.lifeTime = 0;
            }
        }

        if (particle.lifeDuration === -1) {
            return;
        }

        if (!particle.spawning) {
            if (justSpawned) {
                particle.lifeTime = 0;
            } else {
                particle.lifeTime += delta.value;
            }

            if (particle.lifeTime >= particle.lifeDuration) {
                particle.lifeTime = 0;

                if (particle.livesRemaining > 0) {
                    particle.livesRemaining--;
                }

                if (particle.livesRemaining === 0) {
                    particle.destroy();
                    return;
                }

                const canvasSize = this.container.canvas.size;

                particle.position.x = NumberUtils.randomInRange(0, canvasSize.width);
                particle.position.y = NumberUtils.randomInRange(0, canvasSize.height);

                particle.spawning = true;
                particle.lifeDelayTime = 0;
                particle.lifeTime = 0;

                const lifeOptions = particle.particlesOptions.life;

                particle.lifeDelay = NumberUtils.getValue(lifeOptions.delay) * 1000;
                particle.lifeDuration = NumberUtils.getValue(lifeOptions.duration) * 1000;
            }
        }
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
        const sizeVelocity = (particle.size.velocity ?? 0) * delta.factor;
        const maxValue = particle.sizeValue ?? container.retina.sizeValue;
        const minValue = sizeAnim.minimumValue * container.retina.pixelRatio;

        if (sizeAnim.enable) {
            switch (particle.size.status) {
                case SizeAnimationStatus.increasing:
                    if (particle.size.value >= maxValue) {
                        particle.size.status = SizeAnimationStatus.decreasing;
                    } else {
                        particle.size.value += sizeVelocity;
                    }
                    break;
                case SizeAnimationStatus.decreasing:
                    if (particle.size.value <= minValue) {
                        particle.size.status = SizeAnimationStatus.increasing;
                    } else {
                        particle.size.value -= sizeVelocity;
                    }
            }

            switch (sizeAnim.destroy) {
                case DestroyType.max:
                    if (particle.size.value >= maxValue) {
                        particle.destroy();
                    }
                    break;
                case DestroyType.min:
                    if (particle.size.value <= minValue) {
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

    private updateOutModes(delta: IDelta): void {
        const outModes = this.particle.particlesOptions.move.outModes;

        this.updateOutMode(delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        this.updateOutMode(delta, outModes.left ?? outModes.default, OutModeDirection.left);
        this.updateOutMode(delta, outModes.right ?? outModes.default, OutModeDirection.right);
        this.updateOutMode(delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }

    private updateOutMode(
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode | OutModeAlt,
        direction: OutModeDirection
    ) {
        const container = this.container;
        const particle = this.particle;
        const gravityOptions = particle.particlesOptions.move.gravity;

        switch (outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
            case "bounceVertical":
            case "bounceHorizontal":
                this.updateBounce(delta, direction);

                break;
            case OutMode.destroy:
                if (!Utils.isPointInside(particle.position, container.canvas.size, particle.size.value, direction)) {
                    container.particles.remove(particle);
                }
                break;
            case OutMode.out:
                if (!Utils.isPointInside(particle.position, container.canvas.size, particle.size.value, direction)) {
                    this.fixOutOfCanvasPosition(direction);
                }
                break;
            case OutMode.none:
                if (!gravityOptions.enable) {
                    container.particles.remove(particle);
                } else {
                    const position = particle.position;

                    if (
                        (gravityOptions.acceleration >= 0 &&
                            position.y > container.canvas.size.height &&
                            direction === "bottom") ||
                        (gravityOptions.acceleration < 0 && position.y < 0 && direction === "top")
                    ) {
                        container.particles.remove(particle);
                    }
                }
                break;
        }
    }

    private fixOutOfCanvasPosition(direction: OutModeDirection): void {
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

        if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width - particle.offset.x) {
            particle.position.x = newPos.left;

            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        } else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
            particle.position.x = newPos.right;

            if (!wrap) {
                particle.position.y = Math.random() * canvasSize.height;
            }
        }

        if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height - particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }

            particle.position.y = newPos.top;
        } else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
            if (!wrap) {
                particle.position.x = Math.random() * canvasSize.width;
            }

            particle.position.y = newPos.bottom;
        }
    }

    private updateBounce(delta: IDelta, direction: OutModeDirection): void {
        const container = this.container;
        const particle = this.particle;
        let handled = false;

        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
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

        if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal || outMode === "bounceHorizontal") {
            const velocity = particle.velocity.horizontal;
            let bounced = false;

            if (
                (direction === OutModeDirection.right && bounds.right >= canvasSize.width && velocity > 0) ||
                (direction === OutModeDirection.left && bounds.left <= 0 && velocity < 0)
            ) {
                const newVelocity = NumberUtils.getValue(particle.particlesOptions.bounce.horizontal);

                particle.velocity.horizontal *= -newVelocity;

                bounced = true;
            }

            if (bounced) {
                const minPos = offset.x + size;

                if (bounds.right >= canvasSize.width) {
                    particle.position.x = canvasSize.width - minPos;
                } else if (bounds.left <= 0) {
                    particle.position.x = minPos;
                }
            }
        }

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical || outMode === "bounceVertical") {
            const velocity = particle.velocity.vertical;
            let bounced = false;

            if (
                (direction === OutModeDirection.bottom &&
                    bounds.bottom >= container.canvas.size.height &&
                    velocity > 0) ||
                (direction === OutModeDirection.top && bounds.top <= 0 && velocity < 0)
            ) {
                const newVelocity = NumberUtils.getValue(particle.particlesOptions.bounce.vertical);

                particle.velocity.vertical *= -newVelocity;

                bounced = true;
            }

            if (bounced) {
                const minPos = offset.y + size;

                if (bounds.bottom >= canvasSize.height) {
                    particle.position.y = canvasSize.height - minPos;
                } else if (bounds.top <= 0) {
                    particle.position.y = minPos;
                }
            }
        }
    }
}
