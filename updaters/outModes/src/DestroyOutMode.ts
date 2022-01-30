import type { Container, IDelta, OutModeAlt, Particle } from "tsparticles-engine";
import { OutMode, OutModeDirection, ParticleOutType, Vector, getDistances, isPointInside } from "tsparticles-engine";
import type { IOutModeManager } from "./IOutModeManager";

export class DestroyOutMode implements IOutModeManager {
    modes: (OutMode | OutModeAlt | keyof typeof OutMode)[];

    constructor(private readonly container: Container) {
        this.modes = [OutMode.destroy];
    }

    update(
        particle: Particle,
        direction: OutModeDirection,
        delta: IDelta,
        outMode: OutMode | OutModeAlt | keyof typeof OutMode
    ): void {
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
                        direction
                    )
                ) {
                    return;
                }

                break;
            case ParticleOutType.inside: {
                const { dx, dy } = getDistances(particle.position, particle.moveCenter);
                const { x: vx, y: vy } = particle.velocity;

                if (
                    (vx < 0 && dx > particle.moveCenter.radius) ||
                    (vy < 0 && dy > particle.moveCenter.radius) ||
                    (vx >= 0 && dx < -particle.moveCenter.radius) ||
                    (vy >= 0 && dy < -particle.moveCenter.radius)
                ) {
                    return;
                }

                break;
            }
        }

        container.particles.remove(particle, undefined, true);
    }
}
