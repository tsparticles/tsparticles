import type { Container, Engine, IParticle } from "tsparticles";
import { Particle, ParticlesInteractorBase, Vector, WorkerQueryType, getDistances, clamp } from "tsparticles";

export class Repulser extends ParticlesInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.repulse.enabled;
    }

    reset(): void {
        // do nothing
    }

    async interact(p1: IParticle): Promise<void> {
        const container = this.container;
        const repulseOpt1 = p1.options.repulse;
        const pos1 = p1.getPosition();

        const queryId = await this.#engine.queryTree(
            {
                queryId: "particles-repulser",
                queryType: WorkerQueryType.circle,
                radius: repulseOpt1.distance,
                position: pos1,
                containerId: container.treeId,
            },
            (containerId, qid, ids) => {
                if (container.treeId !== containerId || queryId !== qid) {
                    return;
                }

                for (const id of ids) {
                    const p2 = container.particles.getParticle(id);

                    if (!p2 || p1 === p2 || p2.destroyed) {
                        continue;
                    }

                    const pos2 = p2.getPosition();
                    const { dx, dy, distance } = getDistances(pos2, pos1);
                    const velocity = repulseOpt1.speed * repulseOpt1.factor;
                    if (distance > 0) {
                        const repulseFactor = clamp(
                            (1 - Math.pow(distance / repulseOpt1.distance, 2)) * velocity,
                            0,
                            velocity
                        );
                        const normVec = Vector.create((dx / distance) * repulseFactor, (dy / distance) * repulseFactor);

                        p2.position.addTo(normVec);
                    } else {
                        const velocityVec = Vector.create(velocity, velocity);

                        p2.position.addTo(velocityVec);
                    }
                }
            }
        );
    }
}
