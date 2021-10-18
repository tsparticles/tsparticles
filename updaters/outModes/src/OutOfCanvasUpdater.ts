import type { Container, IDelta, IParticleUpdater, Particle } from "tsparticles-engine";
import {
    calculateBounds,
    isPointInside,
    OutMode,
    OutModeAlt,
    OutModeDirection,
    ParticleOutType,
    Vector,
} from "tsparticles-engine";
import { bounceHorizontal, bounceVertical } from "./Utils";

export class OutOfCanvasUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    init(): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && !particle.spawning;
    }

    update(particle: Particle, delta: IDelta): void {
        const outModes = particle.options.move.outModes;

        this.updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        this.updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
        this.updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
        this.updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }

    private updateOutMode(
        particle: Particle,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode | OutModeAlt,
        direction: OutModeDirection
    ) {
        switch (outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
            case "bounceVertical":
            case "bounceHorizontal":
            case OutMode.split:
                this.bounce(particle, delta, direction, outMode);

                break;
            case OutMode.destroy:
                this.destroy(particle, direction);

                break;
            case OutMode.out:
                this.out(particle, direction);

                break;
            case OutMode.none:
            default:
                this.none(particle, direction);

                break;
        }
    }

    private destroy(particle: Particle, direction: OutModeDirection): void {
        const container = this.container;

        switch (particle.outType) {
            case ParticleOutType.normal:
            case ParticleOutType.outside:
                if (
                    isPointInside(
                        particle.position,
                        container.canvas.size,
                        Vector.origin,
                        particle.getRadius(),
                        direction
                    )
                ) {
                    return;
                }

                break;
            case ParticleOutType.inside:
                if (
                    !isPointInside(
                        particle.position,
                        {
                            width: 1,
                            height: 1,
                        },
                        particle.moveCenter,
                        particle.getRadius(),
                        direction
                    )
                ) {
                    return;
                }

                break;
        }

        container.particles.remove(particle, undefined, true);
    }

    private out(particle: Particle, direction: OutModeDirection): void {
        switch (particle.outType) {
            case ParticleOutType.inside:
                break;
            case ParticleOutType.normal:
            case ParticleOutType.outside: {
                const container = this.container;

                if (
                    isPointInside(
                        particle.position,
                        container.canvas.size,
                        Vector.origin,
                        particle.getRadius(),
                        direction
                    )
                ) {
                    return;
                }

                if (particle.outType === ParticleOutType.outside) {
                    particle.position.x = particle.moveCenter.x;
                    particle.position.y = particle.moveCenter.y;
                } else {
                    const wrap = particle.options.move.warp,
                        canvasSize = container.canvas.size,
                        newPos = {
                            bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                            left: -particle.getRadius() - particle.offset.x,
                            right: canvasSize.width + particle.getRadius() + particle.offset.x,
                            top: -particle.getRadius() - particle.offset.y,
                        },
                        sizeValue = particle.getRadius(),
                        nextBounds = calculateBounds(particle.position, sizeValue);

                    if (
                        direction === OutModeDirection.right &&
                        nextBounds.left > canvasSize.width + particle.offset.x
                    ) {
                        particle.position.x = newPos.left;
                        particle.initialPosition.x = particle.position.x;

                        if (!wrap) {
                            particle.position.y = Math.random() * canvasSize.height;
                            particle.initialPosition.y = particle.position.y;
                        }
                    } else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
                        particle.position.x = newPos.right;
                        particle.initialPosition.x = particle.position.x;

                        if (!wrap) {
                            particle.position.y = Math.random() * canvasSize.height;
                            particle.initialPosition.y = particle.position.y;
                        }
                    }

                    if (
                        direction === OutModeDirection.bottom &&
                        nextBounds.top > canvasSize.height + particle.offset.y
                    ) {
                        if (!wrap) {
                            particle.position.x = Math.random() * canvasSize.width;
                            particle.initialPosition.x = particle.position.x;
                        }

                        particle.position.y = newPos.top;
                        particle.initialPosition.y = particle.position.y;
                    } else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
                        if (!wrap) {
                            particle.position.x = Math.random() * canvasSize.width;
                            particle.initialPosition.x = particle.position.x;
                        }

                        particle.position.y = newPos.bottom;
                        particle.initialPosition.y = particle.position.y;
                    }
                }

                break;
            }
        }
    }

    private bounce(
        particle: Particle,
        delta: IDelta,
        direction: OutModeDirection,
        outMode: OutMode | OutModeAlt | keyof typeof OutMode
    ): void {
        const container = this.container;
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

        const pos = particle.getPosition(),
            offset = particle.offset,
            size = particle.getRadius(),
            bounds = calculateBounds(pos, size),
            canvasSize = container.canvas.size;

        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }

    private none(particle: Particle, direction: OutModeDirection): void {
        if (
            (particle.options.move.distance.horizontal &&
                (direction === OutModeDirection.left || direction === OutModeDirection.right)) ||
            (particle.options.move.distance.vertical &&
                (direction === OutModeDirection.top || direction === OutModeDirection.bottom))
        ) {
            return;
        }

        const gravityOptions = particle.options.move.gravity,
            container = this.container;

        const canvasSize = container.canvas.size;
        const pRadius = particle.getRadius();

        if (!gravityOptions.enable) {
            if (
                (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius) ||
                (particle.velocity.y < 0 && particle.position.y >= -pRadius) ||
                (particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius) ||
                (particle.velocity.x < 0 && particle.position.x >= -pRadius)
            ) {
                return;
            }

            if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
                container.particles.remove(particle);
            }
        } else {
            const position = particle.position;

            if (
                (!gravityOptions.inverse &&
                    position.y > canvasSize.height + pRadius &&
                    direction === OutModeDirection.bottom) ||
                (gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top)
            ) {
                container.particles.remove(particle);
            }
        }
    }
}
