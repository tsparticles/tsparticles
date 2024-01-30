import {
    type Container,
    type IDelta,
    OutMode,
    type OutModeDirection,
    type Particle,
    ParticleOutType,
    Vector,
    getDistances,
    isPointInside,
} from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";

const minVelocity = 0;

export class DestroyOutMode implements IOutModeManager {
    modes: (OutMode | keyof typeof OutMode)[];

    constructor(private readonly container: Container) {
        this.modes = [OutMode.destroy];
    }

    async update(
        particle: Particle,
        direction: OutModeDirection,
        _delta: IDelta,
        outMode: OutMode | keyof typeof OutMode,
    ): Promise<void> {
        if (!this.modes.includes(outMode)) {
            return;
        }

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
                        direction,
                    )
                ) {
                    return;
                }

                break;
            case ParticleOutType.inside: {
                const { dx, dy } = getDistances(particle.position, particle.moveCenter),
                    { x: vx, y: vy } = particle.velocity;

                if (
                    (vx < minVelocity && dx > particle.moveCenter.radius) ||
                    (vy < minVelocity && dy > particle.moveCenter.radius) ||
                    (vx >= minVelocity && dx < -particle.moveCenter.radius) ||
                    (vy >= minVelocity && dy < -particle.moveCenter.radius)
                ) {
                    return;
                }

                break;
            }
        }

        container.particles.remove(particle, undefined, true);

        await Promise.resolve();
    }
}
