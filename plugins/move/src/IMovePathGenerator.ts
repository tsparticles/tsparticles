import type { IDelta, Particle, Vector } from "@tsparticles/engine";

/**
 */
export interface IMovePathGenerator {
  generate: (particle: Particle, delta: IDelta) => Vector;

  init: () => void;

  reset: (particle: Particle) => void;

  update: () => void;
}
