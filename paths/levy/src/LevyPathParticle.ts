import type { Particle } from "@tsparticles/engine";

export type LevyPathParticle = Particle & {
  levy?: {
    angle: number;
    baseSpeed: number;
  };
};
