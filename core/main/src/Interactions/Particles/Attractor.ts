import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { Container } from "../../Core/Container";
import { Particle } from "../../Core/Particle";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import { getDistances } from "../../Utils";

/**
 * @category Interactions
 */
export class Attractor implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    interact(p1: IParticle): void {
        const container = this.container;
        const distance = p1.attractDistance ?? container.retina.attractDistance;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, distance);

        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }

            const pos2 = p2.getPosition();

            /* condensed particles */
            const { dx, dy } = getDistances(pos1, pos2);
            const rotate = p1.options.move.attract.rotate;
            const ax = dx / (rotate.x * 1000);
            const ay = dy / (rotate.y * 1000);

            p1.velocity.x -= ax;
            p1.velocity.y -= ay;
            p2.velocity.x += ax;
            p2.velocity.y += ay;
        }
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.move.attract.enable;
    }

    reset(): void {
        // do nothing
    }
}
