import type { IParticle } from "tsparticles-engine";

export type PolygonPathParticle = IParticle & {
    hexStep?: number;
    hexDirection?: number;
    hexSpeed?: number;
};
