import type { Container, Particle } from "tsparticles-engine";
import { ParticlesInteractorBase, Vector, clamp, getDistances, getRangeValue } from "tsparticles-engine";

type RepulseParticle = Particle & {
    repulse?: {
        distance: number;
        speed: number;
        factor: number;
    };
};

export class Repulser extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.repulse.enabled;
    }

    reset(): void {
        // do nothing
    }

    async interact(p1: RepulseParticle): Promise<void> {
        const container = this.container;

        if (!p1.repulse) {
            const repulseOpt1 = p1.options.repulse;

            p1.repulse = {
                distance: getRangeValue(repulseOpt1.distance),
                speed: getRangeValue(repulseOpt1.speed),
                factor: getRangeValue(repulseOpt1.factor),
            };
        }

        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, p1.repulse.distance);

        for (const p2 of query) {
            if (p1 === p2 || p2.destroyed) {
                continue;
            }

            const pos2 = p2.getPosition();
            const { dx, dy, distance } = getDistances(pos2, pos1);
            const velocity = p1.repulse.speed * p1.repulse.factor;
            if (distance > 0) {
                const repulseFactor = clamp((1 - Math.pow(distance / p1.repulse.distance, 2)) * velocity, 0, velocity);
                const normVec = Vector.create((dx / distance) * repulseFactor, (dy / distance) * repulseFactor);

                p2.position.addTo(normVec);
            } else {
                const velocityVec = Vector.create(velocity, velocity);

                p2.position.addTo(velocityVec);
            }
        }
    }
}
