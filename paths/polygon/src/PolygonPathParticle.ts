import type { IParticle } from "tsparticles-engine";

export type PolygonPathParticle = IParticle & {
    hexDirection?: number;
    hexSpeed?: number;
    hexStep?: number;
};
