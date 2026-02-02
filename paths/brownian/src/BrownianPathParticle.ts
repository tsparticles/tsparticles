import type { Particle } from "@tsparticles/engine";

export type BrownianPathParticle = Particle & {
  brownian?: {
    angle: number;
    speed: number;
  };
};
