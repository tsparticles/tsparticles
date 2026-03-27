import type { IStarShape } from "./IStarShape.js";
import type { Particle } from "@tsparticles/engine";

export type StarParticle = Particle & {
  shapeData?: IStarShape;
  starInset?: number;
};
