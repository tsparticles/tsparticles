import type { ICoordinates, Particle } from "@tsparticles/engine";

export type GridPathParticle = Particle & {
  grid?: {
    cellPosition: ICoordinates;
    direction: number;
    speed: number;
  };
};
