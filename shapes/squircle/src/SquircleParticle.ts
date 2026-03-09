import type { Particle } from "@tsparticles/engine";

export type SquircleParticle = Particle & {
  squircleExponent?: number;
  squircleSteps?: number;
};
