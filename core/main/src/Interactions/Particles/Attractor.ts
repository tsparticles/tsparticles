import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { Container } from "../../Core/Container";
import { Particle } from "../../Core/Particle";
import { NumberUtils } from "../../Utils";
import { ParticlesBase } from "./ParticlesBase";

/**
 * @category Interactions
 */
export class Attractor extends ParticlesBase {
    constructor(container: Container) {
        super(container, "attractor");
    }

    public interact(p1: IParticle): void {
        const container = this.container;
        const distance = p1.attractDistance ?? container.retina.attractDistance;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, distance);

        for (const p2 of query) {
            if (p1 === p2 || !p2.particlesOptions.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }

            const pos2 = p2.getPosition();

            /* condensed particles */
            const { dx, dy } = NumberUtils.getDistances(pos1, pos2);
            const rotate = p1.particlesOptions.move.attract.rotate;
            const ax = dx / (rotate.x * 1000);
            const ay = dy / (rotate.y * 1000);
            const p1Factor = p2.size.value / p1.size.value;
            const p2Factor = 1 / p1Factor;

            p1.velocity.horizontal -= ax * p1Factor;
            p1.velocity.vertical -= ay * p1Factor;
            p2.velocity.horizontal += ax * p2Factor;
            p2.velocity.vertical += ay * p2Factor;
        }
    }

    public isEnabled(particle: Particle): boolean {
        return particle.particlesOptions.move.attract.enable;
    }

    public reset(): void {
        // do nothing
    }
}
