import { IBounds, ICoordinates, IDelta, IDimension, IParticleUpdater } from "../Core/Interfaces";
import { calculateBounds, getRangeValue, isPointInside } from "../Utils";
import { OutMode, OutModeAlt, OutModeDirection } from "../Enums";
import { Particle } from "../Core/Particle";
import { Container } from "../Core/Container";

export interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}

export function bounceHorizontal(data: IBounceData): void {
    if (
        !(
            data.outMode === OutMode.bounce ||
            data.outMode === OutMode.bounceHorizontal ||
            data.outMode === "bounceHorizontal" ||
            data.outMode === OutMode.split
        )
    ) {
        return;
    }

    const velocity = data.particle.velocity.x;
    let bounced = false;

    if (
        (data.direction === OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === OutModeDirection.left && data.bounds.left <= 0 && velocity < 0)
    ) {
        const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);

        data.particle.velocity.x *= -newVelocity;

        bounced = true;
    }

    if (!bounced) {
        return;
    }

    const minPos = data.offset.x + data.size;

    if (data.bounds.right >= data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - minPos;
    } else if (data.bounds.left <= 0) {
        data.particle.position.x = minPos;
    }

    if (data.outMode === OutMode.split) {
        data.particle.destroy();
    }
}

export function bounceVertical(data: IBounceData): void {
    if (
        data.outMode === OutMode.bounce ||
        data.outMode === OutMode.bounceVertical ||
        data.outMode === "bounceVertical" ||
        data.outMode === OutMode.split
    ) {
        const velocity = data.particle.velocity.y;
        let bounced = false;

        if (
            (data.direction === OutModeDirection.bottom &&
                data.bounds.bottom >= data.canvasSize.height &&
                velocity > 0) ||
            (data.direction === OutModeDirection.top && data.bounds.top <= 0 && velocity < 0)
        ) {
            const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);

            data.particle.velocity.y *= -newVelocity;

            bounced = true;
        }

        if (!bounced) {
            return;
        }

        const minPos = data.offset.y + data.size;

        if (data.bounds.bottom >= data.canvasSize.height) {
            data.particle.position.y = data.canvasSize.height - minPos;
        } else if (data.bounds.top <= 0) {
            data.particle.position.y = minPos;
        }

        if (data.outMode === OutMode.split) {
            data.particle.destroy();
        }
    }
}

export class OutOfCanvasUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

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

        if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }

        container.particles.remove(particle, undefined, true);
    }

    private out(particle: Particle, direction: OutModeDirection): void {
        const container = this.container;

        if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }

        const wrap = particle.options.move.warp,
            canvasSize = container.canvas.size,
            newPos = {
                bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                left: /*-particle.getRadius()*/ -particle.offset.x,
                right: canvasSize.width + particle.getRadius() + particle.offset.x,
                top: /*-particle.getRadius()*/ -particle.offset.y,
            },
            sizeValue = particle.getRadius(),
            nextBounds = calculateBounds(particle.position, sizeValue);

        if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width + particle.offset.x) {
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

        if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height + particle.offset.y) {
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

        if (!gravityOptions.enable) {
            if (!isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
                container.particles.remove(particle);
            }
        } else {
            const position = particle.position;

            if (
                (!gravityOptions.inverse &&
                    position.y > container.canvas.size.height &&
                    direction === OutModeDirection.bottom) ||
                (gravityOptions.inverse && position.y < 0 && direction === OutModeDirection.top)
            ) {
                container.particles.remove(particle);
            }
        }
    }
}
