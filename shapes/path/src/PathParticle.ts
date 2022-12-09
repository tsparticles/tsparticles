import type { IPathData } from "./IPathData";
import type { Particle } from "tsparticles-engine";

export type PathParticle = Particle & {
    pathData?: IPathData;
};
