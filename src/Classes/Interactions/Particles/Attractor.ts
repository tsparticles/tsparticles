import type { IParticle } from "../../../Interfaces/IParticle";
import type { Container } from "../../Container";

export class Attractor {
    public static attract(p1: IParticle, container: Container): void {
        const options = container.options;
        const distance = p1.lineLinkedDistance ?? container.retina.lineLinkedDistance;

        for (const p2 of container.particles.spatialGrid.queryRadius(p1.position, distance)) {
            if (p1 === p2 || p2.particlesOptions.move.attract.enable) {
                continue;
            }

            /* condensed particles */
            const dx = p1.position.x - p2.position.x;
            const dy = p1.position.y - p2.position.y;
            const rotate = options.particles.move.attract.rotate;
            const ax = dx / (rotate.x * 1000);
            const ay = dy / (rotate.y * 1000);

            p1.velocity.horizontal -= ax;
            p1.velocity.vertical -= ay;
            p2.velocity.horizontal += ax;
            p2.velocity.vertical += ay;
        }

    }
}
