import type { Container, IParticle } from "tsparticles-engine";
import { Particle, ParticlesInteractorBase, Vector, clamp, getDistances } from "tsparticles-engine";

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

    interact(p1: IParticle): void {
        const container = this.container;
        const repulseOpt1 = p1.options.repulse;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, repulseOpt1.distance);

        for (const p2 of query) {
            if (p1 === p2 || p2.destroyed) {
                continue;
            }

            const pos2 = p2.getPosition();
            const { dx, dy, distance } = getDistances(pos2, pos1);
            const velocity = repulseOpt1.speed * repulseOpt1.factor;
            if (distance > 0) {
                const repulseFactor = clamp((1 - Math.pow(distance / repulseOpt1.distance, 2)) * velocity, 0, velocity);
                const normVec = Vector.create((dx / distance) * repulseFactor, (dy / distance) * repulseFactor);

                p2.position.addTo(normVec);
            } else {
                const velocityVec = Vector.create(velocity, velocity);

                p2.position.addTo(velocityVec);
            }
        }
    }
}
