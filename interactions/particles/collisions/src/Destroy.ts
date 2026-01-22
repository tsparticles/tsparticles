import type { Particle } from "@tsparticles/engine";
import { bounce } from "./Bounce.js";

/**
 * @param p1 -
 * @param p2 -
 */
export function destroy(p1: Particle, p2: Particle): void {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }

  const p1Radius = p1.getRadius(),
    p2Radius = p2.getRadius();

  if (!p1Radius && p2Radius) {
    p1.destroy();
  } else if (p1Radius && !p2Radius) {
    p2.destroy();
  } else if (p1Radius && p2Radius) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;

    deleteP.destroy();
  }
}
