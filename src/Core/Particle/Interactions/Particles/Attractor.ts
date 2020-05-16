import type { IParticle } from "../../../Interfaces/IParticle";
import type { Container } from "../../../Container";
import { Circle, Utils } from "../../../../Utils";

export class Attractor {
    public static attract(p1: IParticle, container: Container, _delta: number): void {
        const options = container.options;
        const distance = p1.linksDistance ?? container.retina.linksDistance;

        const pos1 = p1.getPosition();

        //const query = container.particles.spatialGrid.queryRadius(pos1, distance);
        const query = container.particles.quadTree.query(new Circle(pos1.x, pos1.y, distance));

        for (const p2 of query) {
            if (p1 === p2 || p2.particlesOptions.move.attract.enable) {
                continue;
            }

            const pos2 = p2.getPosition();

            /* condensed particles */
            const { dx, dy } = Utils.getDistances(pos1, pos2);
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
