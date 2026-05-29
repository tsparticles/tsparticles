import type { DestroyType, IRangedAnimation } from "@tsparticles/engine";

/** Size animation options */
export interface ISizeAnimation extends IRangedAnimation {
  /**
   * The value to use for destroying the particle.
   */
  destroy: DestroyType | keyof typeof DestroyType;
}
