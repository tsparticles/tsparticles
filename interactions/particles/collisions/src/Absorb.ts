import { type IDelta, type Particle, clamp } from "@tsparticles/engine";
import type { CollisionParticle } from "./Types.js";

const minAbsorbAmount = 0;

/**
 * @param p1 -
 * @param r1 -
 * @param p2 -
 * @param r2 -
 * @param delta -
 * @param pixelRatio -
 */
function updateAbsorb(
  p1: CollisionParticle,
  r1: number,
  p2: CollisionParticle,
  r2: number,
  delta: IDelta,
  pixelRatio: number,
): void {
  if (!p1.options.collisions || !p2.options.collisions) {
    return;
  }

  const absorbSpeed = p1.options.collisions.absorb.speed,
    shrinkAmount = clamp(absorbSpeed * delta.factor, minAbsorbAmount, r2);

  p1.size.value = Math.sqrt(r1 * r1 + shrinkAmount * shrinkAmount);
  p2.size.value -= shrinkAmount;

  if (p2.size.value <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}

/**
 * @param p1 -
 * @param p2 -
 * @param delta -
 * @param pixelRatio -
 */
export function absorb(p1: Particle, p2: Particle, delta: IDelta, pixelRatio: number): void {
  const r1 = p1.getRadius(),
    r2 = p2.getRadius();

  if (!r1 && r2) {
    p1.destroy();
  } else if (r1 && !r2) {
    p2.destroy();
  } else if (r1 && r2) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
    }
  }
}
