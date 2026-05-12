import type { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IRangedAnimation } from "../../IAnimation.js";

/** Opacity animation options */
export interface IOpacityAnimation extends IRangedAnimation {
  /**
   * The value to use for destroying the particle.
   */
  destroy: DestroyType | keyof typeof DestroyType;
}
