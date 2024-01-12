import { type Particle, getRangeValue } from "@tsparticles/engine";

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

/**
 * @param p1 - first particle to bounce
 * @param p2 - second particle to bounce
 */
export async function bounce(p1: BounceParticle, p2: BounceParticle): Promise<void> {
    const { circleBounce, circleBounceDataFromParticle } = await import("@tsparticles/engine");

    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));

    fixBounceSpeed(p1);
    fixBounceSpeed(p2);
}
