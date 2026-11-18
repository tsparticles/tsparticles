import type { OklchAnimation, Particle } from "@tsparticles/engine";

export type PaintParticle = Particle & {
  fillAnimation?: OklchAnimation;
  strokeAnimation?: OklchAnimation;
};
