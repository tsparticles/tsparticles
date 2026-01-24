import type { Particle } from "@tsparticles/engine";

export type RoundedParticle = Particle & {
  borderRadius?: number;
};
