import { circleBounce, circleBounceDataFromParticle, getRangeValue } from "@tsparticles/engine";
import { type CollisionParticle } from "./Types.js";

type BounceParticle = CollisionParticle & {
    collisionMaxSpeed?: number;
};

const fixBounceSpeed = (p: BounceParticle): void => {
    if (!p.options.collisions) {
        return;
    }

    p.collisionMaxSpeed ??= getRangeValue(p.options.collisions.maxSpeed);

    if (p.velocity.length > p.collisionMaxSpeed) {
        p.velocity.length = p.collisionMaxSpeed;
    }
};

/**
 * @param p1 - first particle to bounce
 * @param p2 - second particle to bounce
 */
export function bounce(p1: BounceParticle, p2: BounceParticle): void {
    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));

    fixBounceSpeed(p1);
    fixBounceSpeed(p2);
}
