import type { IDelta, OutMode, OutModeDirection, Particle } from "@tsparticles/engine";

/** Out mode manager interface */
export interface IOutModeManager {
  /** Supported out modes */
  modes: (OutMode | keyof typeof OutMode)[];

  /** Updates the particle based on the out mode */
  update(particle: Particle, direction: OutModeDirection, delta: IDelta, outMode: OutMode | keyof typeof OutMode): void;
}
