import { Particle } from "../../Core/Particle";
import type { Container } from "../../Core/Container";
import { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import { NumberUtils } from "../../Utils";
import { IParticle } from "../../Core/Interfaces/IParticle";
import { ICoordinates } from "../../Core/Interfaces/ICoordinates";

export class Repulser implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
        return particle.particlesOptions.repulse.enabled;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: IParticle): void {
        const container = this.container;
        const repulseOpt1 = p1.particlesOptions.repulse;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, repulseOpt1.distance * 2);

        for (const p2 of query) {
            if (p1 === p2 || p2.destroyed) {
                continue;
            }

            const pos2 = p2.getPosition();
            const { dx, dy, distance } = NumberUtils.getDistances(pos2, pos1);
            const velocity = repulseOpt1.speed * repulseOpt1.factor;
            if (distance > 0) {
                // repulseDistanceFactor = how much to modify dx and dy to move p2 to the edge of the repulse radius.
                if (distance - p2.getRadius() < repulseOpt1.distance) {
                    const repulseDistanceFactor = (p2.getRadius() + repulseOpt1.distance - distance) / distance;
                    const repulseVector = {
                        x: dx * repulseDistanceFactor,
                        y: dy * repulseDistanceFactor,
                    };

                    p2.mover.moveXY(repulseVector.x * repulseOpt1.factor, repulseVector.y * repulseOpt1.factor);
                }
            } else {
                p2.mover.moveXY(velocity, velocity);
            }
        }
    }
}
