import { type CollisionParticle, type IParticlesCollisionOptions, type ParticlesCollisionOptions } from "./Types.js";
import {
    type Container,
    type IDelta,
    type IInteractivityData,
    ParticlesInteractorBase,
    type RecursivePartial,
    getDistance,
} from "@tsparticles/engine";
import { Collisions } from "./Options/Classes/Collisions.js";
import { resolveCollision } from "./ResolveCollision.js";

const double = 2;

/**
 */
export class Collider extends ParticlesInteractorBase<Container, CollisionParticle> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: Container) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    interact(p1: CollisionParticle, _interactivityData: IInteractivityData, delta: IDelta): void {
        if (p1.destroyed || p1.spawning) {
            return;
        }

        const container = this.container,
            pos1 = p1.getPosition(),
            radius1 = p1.getRadius(),
            query = container.particles.quadTree.queryCircle(pos1, radius1 * double) as CollisionParticle[];

        for (const p2 of query) {
            if (
                p1 === p2 ||
                !p1.options.collisions ||
                !p2.options.collisions ||
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

    isEnabled(particle: CollisionParticle): boolean {
        return !!particle.options.collisions?.enable;
    }

    loadParticlesOptions(
        options: ParticlesCollisionOptions,
        ...sources: (RecursivePartial<IParticlesCollisionOptions> | undefined)[]
    ): void {
        options.collisions ??= new Collisions();

        for (const source of sources) {
            options.collisions.load(source?.collisions);
        }
    }

    reset(): void {
        // do nothing
    }
}
