import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";
import type { Vector } from "../Utils/Vectors.js";

/**
 */
export interface IMovePathGenerator {
  generate: (particle: Particle, delta: IDelta) => Vector;

  init: () => void;

  reset: (particle: Particle) => void;

  update: () => void;
}
