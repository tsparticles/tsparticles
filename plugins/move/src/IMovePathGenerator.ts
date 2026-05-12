import type { IDelta, Particle, Vector } from "@tsparticles/engine";

/** Move path generator interface */
export interface IMovePathGenerator {
  /** Generates a path vector for the given particle */
  generate: (particle: Particle, delta: IDelta) => Vector;

  /** Initializes the path generator */
  init: () => void;

  /** Resets the path generator state for the given particle */
  reset: (particle: Particle) => void;

  /** Updates the path generator state */
  update: () => void;
}
