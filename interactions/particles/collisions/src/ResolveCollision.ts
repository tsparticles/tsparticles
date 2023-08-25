import { CollisionMode, type IDelta, type Particle } from "@tsparticles/engine";
import { absorb } from "./Absorb.js";
import { bounce } from "./Bounce.js";
import { destroy } from "./Destroy.js";

/**
 * @param p1 -
 * @param p2 -
 * @param delta -
 * @param pixelRatio -
 */
export function resolveCollision(p1: Particle, p2: Particle, delta: IDelta, pixelRatio: number): void {
    switch (p1.options.collisions.mode) {
        case CollisionMode.absorb: {
            absorb(p1, p2, delta, pixelRatio);
            break;
        }
        case CollisionMode.bounce: {
            bounce(p1, p2);
            break;
        }
        case CollisionMode.destroy: {
            destroy(p1, p2);
            break;
        }
    }
}
