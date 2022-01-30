import { CollisionMode } from "tsparticles-engine";
import type { Particle } from "tsparticles-engine";
import { absorb } from "./Absorb";
import { bounce } from "./Bounce";
import { destroy } from "./Destroy";

export function resolveCollision(p1: Particle, p2: Particle, fps: number, pixelRatio: number): void {
    switch (p1.options.collisions.mode) {
        case CollisionMode.absorb: {
            absorb(p1, p2, fps, pixelRatio);
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
