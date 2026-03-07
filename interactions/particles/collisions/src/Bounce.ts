import { circleBounce, circleBounceDataFromParticle, getRangeValue } from "@tsparticles/engine";
import { type CollisionParticle } from "./Types.js";

type BounceParticle = CollisionParticle & {
  collisionMaxSpeed?: number;
};

const energyCorrectionMinRatio = 1e-6,
  energyDriftThreshold = 1e-4,
  correctionFactorNeutral = 1,
  fixBounceSpeed = (p: BounceParticle): void => {
    if (!p.options.collisions) {
      return;
    }

    p.collisionMaxSpeed ??= getRangeValue(p.options.collisions.maxSpeed);

    if (p.velocity.length > p.collisionMaxSpeed) {
      p.velocity.length = p.collisionMaxSpeed;
    }
  };

/**
 * @param p1 -
 * @param p2 -
 */
export function bounce(p1: BounceParticle, p2: BounceParticle): void {
  const m1 = p1.getMass(),
    m2 = p2.getMass(),
    speed1Before = p1.velocity.length,
    speed2Before = p2.velocity.length,
    keBefore = m1 * speed1Before * speed1Before + m2 * speed2Before * speed2Before;

  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));

  const speed1After = p1.velocity.length,
    speed2After = p2.velocity.length,
    keAfter = m1 * speed1After * speed1After + m2 * speed2After * speed2After;

  if (keAfter > keBefore * energyCorrectionMinRatio) {
    const correctionFactor = Math.sqrt(keBefore / keAfter);

    if (Math.abs(correctionFactor - correctionFactorNeutral) > energyDriftThreshold) {
      p1.velocity.length = speed1After * correctionFactor;
      p2.velocity.length = speed2After * correctionFactor;
    }
  }

  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}
