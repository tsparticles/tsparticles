import type { Container, IDelta, Particle } from "tsparticles-engine";
import { ParticlesInteractorBase, getDistance } from "tsparticles-engine";
import { resolveCollision } from "./ResolveCollision";

/**
 * @category Interactions
 */
export class Collider extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(p1: Particle, delta: IDelta): Promise<void> {
        const container = this.container,
            pos1 = p1.getPosition(),
            radius1 = p1.getRadius(),
            query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);

        for (const p2 of query) {
            if (
                p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning
            ) {
                continue;
            }

            const pos2 = p2.getPosition(),
                radius2 = p2.getRadius();

            if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
                continue;
            }

            const dist = getDistance(pos1, pos2),
                distP = radius1 + radius2;

            if (dist > distP) {
                continue;
            }

            resolveCollision(p1, p2, delta, container.retina.pixelRatio);
        }
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.collisions.enable;
    }

    reset(): void {
        // do nothing
    }
}
