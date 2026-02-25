import type { Particle } from "@tsparticles/engine";

export type BranchesPathParticle = Particle & {
  branching?: {
    angle: number;
    baseSpeed: number;
    remaining: number;
    speed: number;
  };
};
