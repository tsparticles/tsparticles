import type { IShapePathData } from "./IShapePathData.js";
import type { Particle } from "@tsparticles/engine";

export type PathParticle = Particle & {
  pathData?: IShapePathData;
};
