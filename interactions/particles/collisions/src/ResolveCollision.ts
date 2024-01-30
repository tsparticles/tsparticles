import { CollisionMode, type IDelta, type Particle } from "@tsparticles/engine";

/**
 * @param p1 -
 * @param p2 -
 * @param delta -
 * @param pixelRatio -
 */
export async function resolveCollision(p1: Particle, p2: Particle, delta: IDelta, pixelRatio: number): Promise<void> {
    switch (p1.options.collisions.mode) {
        case CollisionMode.absorb: {
            const { absorb } = await import("./Absorb.js");

            absorb(p1, p2, delta, pixelRatio);
            break;
        }
        case CollisionMode.bounce: {
            const { bounce } = await import("./Bounce.js");

            bounce(p1, p2);
            break;
        }
        case CollisionMode.destroy: {
            const { destroy } = await import("./Destroy.js");

            destroy(p1, p2);
            break;
        }
    }
}
