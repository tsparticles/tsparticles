import type { Container, IParticle, Particle } from "../../../Core";
import type { Engine } from "../../../engine";
import { ParticlesInteractorBase } from "../../../Core";
import { WorkerQueryType } from "../../../Enums";
import { getDistances } from "../../../Utils";

/**
 * @category Interactions
 */
export class Attractor extends ParticlesInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: Container) {
        super(container);

        this.#engine = engine;
    }

    async interact(p1: IParticle): Promise<void> {
        const container = this.container,
            distance = p1.retina.attractDistance ?? container.retina.attractDistance,
            pos1 = p1.getPosition();

        const queryId = await this.#engine.queryTree(
            {
                containerId: container.treeId,
                position: pos1,
                queryId: "particles-attract",
                queryType: WorkerQueryType.circle,
                radius: distance,
            },
            (containerId, qid, ids) => {
                if (container.treeId !== containerId || queryId !== qid) {
                    return;
                }

                for (const id of ids) {
                    const p2 = container.particles.getParticle(id);

                    if (!p2 || p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                        continue;
                    }

                    const pos2 = p2.getPosition(),
                        { dx, dy } = getDistances(pos1, pos2),
                        rotate = p1.options.move.attract.rotate,
                        ax = dx / (rotate.x * 1000),
                        ay = dy / (rotate.y * 1000),
                        p1Factor = p2.size.value / p1.size.value,
                        p2Factor = 1 / p1Factor;

                    p1.velocity.x -= ax * p1Factor;
                    p1.velocity.y -= ay * p1Factor;
                    p2.velocity.x += ax * p2Factor;
                    p2.velocity.y += ay * p2Factor;
                }
            }
        );
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.move.attract.enable;
    }

    reset(): void {
        // do nothing
    }
}
