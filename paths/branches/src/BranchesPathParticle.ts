import type { Particle } from "@tsparticles/engine";

export type BranchesPathParticle = Particle & {
  branching?: {
    angle: number;
    remaining: number;
    speed: number;
  };
};
