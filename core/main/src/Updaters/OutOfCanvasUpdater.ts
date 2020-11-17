import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater";
import type { IDelta } from "../Core/Interfaces/IDelta";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection";
import { OutMode, OutModeAlt } from "../Enums/Modes";
import { NumberUtils, Utils } from "../Utils";
import { IBounds } from "../Core/Interfaces/IBounds";
import { IDimension } from "../Core/Interfaces/IDimension";
import { ICoordinates } from "../Core/Interfaces/ICoordinates";

interface IBounceData {
    particle: Particle;
    outMode: OutMode | OutModeAlt | keyof typeof OutMode;
    direction: OutModeDirection;
    bounds: IBounds;
    canvasSize: IDimension;
    offset: ICoordinates;
    size: number;
}

function bounceHorizontal(data: IBounceData): void {
    if (
        !(
            data.outMode === OutMode.bounce ||
            data.outMode === OutMode.bounceHorizontal ||
            data.outMode === "bounceHorizontal"
        )
    ) {
        return;
    }

    const velocity = data.particle.velocity.horizontal;
    let bounced = false;

    if (
        (data.direction === OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === OutModeDirection.left && data.bounds.left <= 0 && velocity < 0)
    ) {
        const newVelocity = NumberUtils.getValue(data.particle.particlesOptions.bounce.horizontal);

        data.particle.velocity.horizontal *= -newVelocity;

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
}

function bounceVertical(data: IBounceData): void {
    if (
        data.outMode === OutMode.bounce ||
        data.outMode === OutMode.bounceVertical ||
        data.outMode === "bounceVertical"
    ) {
        const velocity = data.particle.velocity.vertical;
        let bounced = false;

        if (
            (data.direction === OutModeDirection.bottom &&
                data.bounds.bottom >= data.canvasSize.height &&
                velocity > 0) ||
            (data.direction === OutModeDirection.top && data.bounds.top <= 0 && velocity < 0)
        ) {
            const newVelocity = NumberUtils.getValue(data.particle.particlesOptions.bounce.vertical);

            data.particle.velocity.vertical *= -newVelocity;

            bounced = true;
        }

        if (bounced) {
            const minPos = data.offset.y + data.size;

            if (data.bounds.bottom >= data.canvasSize.height) {
                data.particle.position.y = data.canvasSize.height - minPos;
            } else if (data.bounds.top <= 0) {
                data.particle.position.y = minPos;
            }
        }
    }
}

export class OutOfCanvasUpdater implements IParticleUpdater {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    isEnabled(): boolean {
        const particle = this.particle;

        return !particle.destroyed && !particle.spawning;
    }

    update(delta: IDelta): void {
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
        switch (outMode) {
            case OutMode.bounce:
            case OutMode.bounceVertical:
            case OutMode.bounceHorizontal:
            case "bounceVertical":
            case "bounceHorizontal":
                this.bounce(delta, direction, outMode);

                break;
            case OutMode.destroy:
                this.destroy(direction);

                break;
            case OutMode.out:
                this.out(direction);

                break;
            case OutMode.none:
                this.none(direction);

                break;
        }
    }

    private destroy(direction: OutModeDirection): void {
        const container = this.container,
            particle = this.particle;

        if (Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }

        container.particles.remove(particle);
    }

    private out(direction: OutModeDirection): void {
        const container = this.container,
            particle = this.particle;

        if (Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
            return;
        }

        const wrap = particle.particlesOptions.move.warp,
            canvasSize = container.canvas.size,
            newPos = {
                bottom: canvasSize.height + particle.getRadius() - particle.offset.y,
                left: -particle.getRadius() - particle.offset.x,
                right: canvasSize.width + particle.getRadius() + particle.offset.x,
                top: -particle.getRadius() - particle.offset.y,
            },
            sizeValue = particle.getRadius(),
            nextBounds = Utils.calculateBounds(particle.position, sizeValue);

        if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width - particle.offset.x) {
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

        if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height - particle.offset.y) {
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
        delta: IDelta,
        direction: OutModeDirection,
        outMode: OutMode | OutModeAlt | keyof typeof OutMode
    ): void {
        const container = this.container,
            particle = this.particle;
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
            bounds = Utils.calculateBounds(pos, size),
            canvasSize = container.canvas.size;

        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }

    private none(direction: OutModeDirection): void {
        const particle = this.particle;

        if (particle.particlesOptions.move.distance) {
            return;
        }

        const gravityOptions = particle.particlesOptions.move.gravity,
            container = this.container;

        if (!gravityOptions.enable) {
            if (!Utils.isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
                container.particles.remove(particle);
            }
        } else {
            const position = particle.position;

            if (
                (gravityOptions.acceleration >= 0 &&
                    position.y > container.canvas.size.height &&
                    direction === OutModeDirection.bottom) ||
                (gravityOptions.acceleration < 0 && position.y < 0 && direction === OutModeDirection.top)
            ) {
                container.particles.remove(particle);
            }
        }
    }
}
