import type { DestroyType, IRangedAnimation } from "@tsparticles/engine";

/** Opacity animation options */
export interface IOpacityAnimation extends IRangedAnimation {
  /**
   * The value to use for destroying the particle.
   */
  destroy: DestroyType | keyof typeof DestroyType;
}
