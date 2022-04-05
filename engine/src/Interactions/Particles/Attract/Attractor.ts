import type { Container } from "../../../Core/Container";
import type { IParticle } from "../../../Core/Interfaces/IParticle";
import type { Particle } from "../../../Core/Particle";
import { ParticlesInteractorBase } from "../../../Core/Utils/ParticlesInteractorBase";
import { getDistances } from "../../../Utils/NumberUtils";

/**
 * @category Interactions
 */
export class Attractor extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    async interact(p1: IParticle): Promise<void> {
        const container = this.container,
            distance = p1.retina.attractDistance ?? container.retina.attractDistance,
            pos1 = p1.getPosition(),
            query = container.particles.quadTree.queryCircle(pos1, distance);

        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
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

    isEnabled(particle: Particle): boolean {
        return particle.options.move.attract.enable;
    }

    reset(): void {
        // do nothing
    }
}