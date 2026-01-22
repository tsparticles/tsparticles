import { type IDelta, type Particle, clamp, half } from "@tsparticles/engine";
import type { CollisionParticle } from "./Types.js";

const absorbFactor = 10,
  minAbsorbFactor = 0;

/**
 * @param p1 -
 * @param _r1 -
 * @param p2 -
 * @param r2 -
 * @param delta -
 * @param pixelRatio -
 */
function updateAbsorb(
  p1: CollisionParticle,
  _r1: number,
  p2: CollisionParticle,
  r2: number,
  delta: IDelta,
  pixelRatio: number,
): void {
  if (!p1.options.collisions || !p2.options.collisions) {
    return;
  }

  const factor = clamp((p1.options.collisions.absorb.speed * delta.factor) / absorbFactor, minAbsorbFactor, r2);

  p1.size.value += factor * half;
  p2.size.value -= factor;

  if (r2 <= pixelRatio) {
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
