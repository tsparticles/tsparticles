import { circleBounce, circleBounceDataFromParticle, getRangeValue } from "@tsparticles/engine";
import type { CollisionParticle } from "./Types.js";

/**
 * Bounce particle extension type
 */
export type BounceParticle = CollisionParticle & {
  /** Maximum collision speed for this particle */
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

    const maxSpeed = p.collisionMaxSpeed;

    if (p.velocity.getLengthSq() > maxSpeed * Math.abs(maxSpeed)) {
      p.velocity.length = maxSpeed;
    }
  };

/**
 * @param p1 - The first point
 * @param p2 - The second point
 */
export function bounce(p1: BounceParticle, p2: BounceParticle): void {
  const m1 = p1.getMass(),
    m2 = p2.getMass(),
    keBefore = m1 * p1.velocity.getLengthSq() + m2 * p2.velocity.getLengthSq();

  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));

  const speed1SqAfter = p1.velocity.getLengthSq(),
    speed2SqAfter = p2.velocity.getLengthSq(),
    keAfter = m1 * speed1SqAfter + m2 * speed2SqAfter;

  if (keAfter > keBefore * energyCorrectionMinRatio) {
    const correctionFactor = Math.sqrt(keBefore / keAfter);

    if (Math.abs(correctionFactor - correctionFactorNeutral) > energyDriftThreshold) {
      p1.velocity.length = Math.sqrt(speed1SqAfter) * correctionFactor;
      p2.velocity.length = Math.sqrt(speed2SqAfter) * correctionFactor;
    }
  }

  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}
