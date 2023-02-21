import { circleBounce, circleBounceDataFromParticle, getRangeValue } from "tsparticles-engine";
import type { Particle } from "tsparticles-engine";

type BounceParticle = Particle & {
    collisionMaxSpeed?: number;
};

const fixBounceSpeed = (p: BounceParticle): void => {
    if (p.collisionMaxSpeed === undefined) {
        p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
    }

    if (p.velocity.length > p.collisionMaxSpeed) {
        p.velocity.length = p.collisionMaxSpeed;
    }
};

export function bounce(p1: BounceParticle, p2: BounceParticle): void {
    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));

    fixBounceSpeed(p1);
    fixBounceSpeed(p2);
}
