import type { Particle } from "@tsparticles/engine";

export type PolygonPathParticle = Particle & {
    hexDirection?: number;
    hexSpeed?: number;
    hexStep?: number;
};
