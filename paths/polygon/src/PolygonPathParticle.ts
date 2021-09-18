import type { IParticle } from "tsparticles";

export type PolygonPathParticle = IParticle & {
    hexStep?: number;
    hexDirection?: number;
    hexSpeed?: number;
};
