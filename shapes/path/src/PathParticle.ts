import type { IPathData } from "./IPathData.js";
import type { Particle } from "@tsparticles/engine";

export type PathParticle = Particle & {
  pathData?: IPathData;
};
