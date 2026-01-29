import type { Particle } from "@tsparticles/engine";

export type SpiralPathParticle = Particle & {
  spiralAngle?: number;
  spiralRadius?: number;
};
